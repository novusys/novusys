// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.12;

/* solhint-disable avoid-low-level-calls */
/* solhint-disable no-inline-assembly */
/* solhint-disable reason-string */

import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

import "./BaseAccount.sol";

/**
  * minimal account.
  *  this is sample minimal account.
  *  has execute, eth handling methods
  *  has a single signer that can send requests through the entryPoint.
  */
contract NovusysAccount is BaseAccount, UUPSUpgradeable, Initializable {
    using ECDSA for bytes32;
    using Counters for Counters.Counter;

    //filler member, to push the nonce and owner to the same slot
    // the "Initializeble" class takes 2 bytes in the first slot
    bytes28 private _filler;

    //explicit sizes of nonce, to fit a single storage cell with "owner"
    uint96 private _nonce;
    address public owner;
    address public globalAdmin;

    IEntryPoint private immutable _entryPoint;

    bool public paused = false;

    mapping(address => bool) private recoveryVoters;
    Counters.Counter private totalVoters;
    bool private votersUninitialized;

    struct RecoveryProposal {
        address recoveryAddress;
        uint256 proposalTime;
        address[] votes;
    }

    struct AddVoterProposal {
        address voterAddress;
        uint256 proposalTime;
        address[] vetos;
    }

    struct RemoveVoterProposal {
        address voterAddress;
        uint256 proposalTime;
        address[] vetos;
    }

    RecoveryProposal private recoveryProposal;
    AddVoterProposal private addVoterProposal;
    RemoveVoterProposal private removeVoterProposal;

    event SimpleAccountInitialized(IEntryPoint indexed entryPoint, address indexed owner);
    event Pause();
    event Unpause();
    event RecoveryProposed(address indexed recoveryAddress);
    event RecoveryExecuted(address indexed recoveryAddress);
    event RecoveryVoted(address indexed voter);
    event VotersInitialized(address[] indexed voters);
    event AddVoterProposed(address indexed voter);
    event VoterAdded(address indexed voter);
    event AddVoterVetoed(address indexed voter);
    event RemoveVoterProposed(address indexed voter);
    event VoterRemoved(address indexed voter);
    event RemoveVoterVetoed(address indexed voter);

    modifier onlyOwner() {
        _onlyOwner();
        _;
    }

    /// @inheritdoc BaseAccount
    function nonce() public view virtual override returns (uint256) {
        return _nonce;
    }

    /// @inheritdoc BaseAccount
    function entryPoint() public view virtual override returns (IEntryPoint) {
        return _entryPoint;
    }


    // solhint-disable-next-line no-empty-blocks
    receive() external payable {}

    constructor(IEntryPoint anEntryPoint) {
        _entryPoint = anEntryPoint;
        _disableInitializers();
    }

    function _onlyOwner() internal view {
        //directly from EOA owner, or through the account itself (which gets redirected through execute())
        require(msg.sender == owner || msg.sender == address(this), "only owner");
    }

    function checkGlobalAdminAllowedOps(UserOperation calldata op) internal pure returns (bool) {
        if (op.callData.length == 0) return false;
        //Global admin can only call pause
        return bytes4(op.callData) == this.pause.selector;
    }

    function checkRecoveryVoterAllowedOps(UserOperation calldata op, address voter) internal pure returns (bool) {
        if (op.callData.length == 0) return false;

        //Get function selector
        bytes4 functionSelector;
        assembly{
            functionSelector := calldataload(0)
        }

        //Check function selection against allowed operations
        if(functionSelector == this.voteForRecovery.selector ||
           functionSelector == this.vetoAddition.selector ||
           functionSelector == this.vetoRemoval.selector){
                //Get voter argument
                address voterArgument;
                assembly{
                    voterArgument := calldataload(4)
                }
                //Only allow voters to cast their own vote
                return voter == voterArgument;
        }
        return false;
    }
    

    function pause() external {
        require(!paused, "Wallet already paused");
        _requireFromEntryPointOrOwner();
        paused = true;
        emit Pause();
    }

    function unpause() external {
        require(paused, "Wallet not paused");
        _requireFromEntryPointOrOwner();
        paused = false;
        emit Unpause();
    }

    /**
     * execute a transaction (called directly from owner, or by entryPoint)
     */
    function execute(address dest, uint256 value, bytes calldata func) external {
        require(!paused, "Wallet paused");
        _requireFromEntryPointOrOwner();
        _call(dest, value, func);
    }

    /**
     * execute a sequence of transactions
     */
    function executeBatch(address[] calldata dest, bytes[] calldata func) external {
        require(!paused, "Wallet paused");
        _requireFromEntryPointOrOwner();
        require(dest.length == func.length, "wrong array lengths");
        for (uint256 i = 0; i < dest.length; i++) {
            _call(dest[i], 0, func[i]);
        }
    }

    /**
     * @dev The _entryPoint member is immutable, to reduce gas consumption.  To upgrade EntryPoint,
     * a new implementation of SimpleAccount must be deployed with the new EntryPoint address, then upgrading
      * the implementation by calling `upgradeTo()`
     */
    function initialize(address anOwner) public virtual initializer {
        _initialize(anOwner);
    }

    function _initialize(address anOwner) internal virtual {
        owner = anOwner;
        paused = false;
        votersUninitialized = true;
        emit SimpleAccountInitialized(_entryPoint, owner);
    }

    // Require the function call went through EntryPoint or owner or loopback
    function _requireFromEntryPointOrOwner() internal view {
        require(msg.sender == address(this) || msg.sender == address(entryPoint()) || msg.sender == owner, "account: not Owner or EntryPoint");
    }

    // Require the function call went through EntryPoint or voter
    function _requireFromEntryPointOrVoter() internal view {
        require(msg.sender == address(entryPoint()) || recoveryVoters[msg.sender], "account: not Voter or EntryPoint");
    }

    /// implement template method of BaseAccount
    function _validateAndUpdateNonce(UserOperation calldata userOp) internal override {
        require(_nonce++ == userOp.nonce, "account: invalid nonce");
    }

    /// implement template method of BaseAccount
    function _validateSignature(UserOperation calldata userOp, bytes32 userOpHash)
    internal override virtual returns (uint256 validationData) {
        bytes32 hash = userOpHash.toEthSignedMessageHash();
        address signerAddress = hash.recover(userOp.signature);
        if (signerAddress == owner){
            return 0;
        }
        else if (recoveryVoters[signerAddress] && checkRecoveryVoterAllowedOps(userOp, signerAddress)){
            return 0;
        }
        else if ((signerAddress == globalAdmin) && checkGlobalAdminAllowedOps(userOp)){
            return 0;
        }
        return SIG_VALIDATION_FAILED;

    }

    function _call(address target, uint256 value, bytes memory data) internal {
        (bool success, bytes memory result) = target.call{value : value}(data);
        if (!success) {
            assembly {
                revert(add(result, 32), mload(result))
            }
        }
    }

    function checkAlreadyVoted(address[] memory votes, address voter) internal pure returns (bool){
        for(uint256 i = 0; i < votes.length; i++){
            if(votes[i] == voter){
                return true;
            }
        }
        return false;
    }

    function recoverWallet(address recoveryAddress) external {
        require(!paused, "Wallet paused");
        _requireFromEntryPointOrOwner();
        require(recoveryAddress != address(0), "Recovery to zero address not allowed");

        //Check if proposal time has elapsed
        if(block.timestamp - recoveryProposal.proposalTime > 1 days){
            //Create new proposal
            recoveryProposal.recoveryAddress = recoveryAddress;
            recoveryProposal.proposalTime = block.timestamp;
            delete recoveryProposal.votes;
            
            emit RecoveryProposed(recoveryAddress);
            return;
        }
        else{
            //Check if required votes have been cast
            if(recoveryProposal.votes.length * 2 >= totalVoters.current()){
                //Transfer address to new address
                owner = recoveryProposal.recoveryAddress;
                
                //Reset proposal
                recoveryProposal.recoveryAddress = address(0);
                recoveryProposal.proposalTime = 0;
                delete recoveryProposal.votes;

                emit RecoveryExecuted(recoveryAddress);
                return;
            }
        }
    }

    function voteForRecovery(address voter) external{
        require(!paused, "Wallet paused");
        _requireFromEntryPointOrVoter();
        require(!checkAlreadyVoted(recoveryProposal.votes, voter), "Voter already voted");

        recoveryProposal.votes.push(voter);

        emit RecoveryVoted(voter);
    }

    function initializeVoters(address[] memory voters) external {
        require(!paused, "Wallet paused");
        _requireFromEntryPointOrOwner();
        require(votersUninitialized, "Voters already initialized");
        require(voters.length > 0, "https://youtu.be/JqdDrYuefEQ?t=2");
        
        for(uint256 i = 0; i < voters.length; i++){
            require(voters[i] != address(0), "Zero address is not a valid voter address");
            recoveryVoters[voters[i]] = true;
            totalVoters.increment();
        }

        votersUninitialized = false;
        emit VotersInitialized(voters);
    }

    function addRecoveryVoter(address voter) external {
        require(!paused, "Wallet paused");
        _requireFromEntryPointOrOwner();
        require(!recoveryVoters[voter], "Recovery voter already registered");
        require(voter != owner, "Wallet owner cannot be a recovery voter");
        require(voter != address(0), "Zero address is not a valid voter address");

        //Initialize voters if uninitialized
        if(votersUninitialized){
            votersUninitialized = false;
        }

        //Check if proposal has been vetoed
        if(addVoterProposal.vetos.length * 2 >= totalVoters.current()){
            //Create new proposal
            addVoterProposal.voterAddress = voter;
            addVoterProposal.proposalTime = block.timestamp;
            delete addVoterProposal.vetos;

            emit AddVoterProposed(voter);
            return;
        }

        //Check if proposal time has expired (i.e. proposal has passed)
        if(block.timestamp - addVoterProposal.proposalTime > 1 days){
            if(voter == addVoterProposal.voterAddress){
                //Add voter to registery
                recoveryVoters[voter] = true;
                totalVoters.increment();
                
                //Reset proposal
                addVoterProposal.voterAddress = address(0);
                addVoterProposal.proposalTime = 0;
                delete addVoterProposal.vetos;

                emit VoterAdded(voter);
                return;
            }
            else{
                //Create new proposal
                addVoterProposal.voterAddress = voter;
                addVoterProposal.proposalTime = block.timestamp;
                delete addVoterProposal.vetos;

                emit AddVoterProposed(voter);
                return;
            }
        }
        return;
    }


    function vetoAddition(address voter) external{
        require(!paused, "Wallet paused");
        _requireFromEntryPointOrVoter();
        require(!checkAlreadyVoted(addVoterProposal.vetos, voter), "Voter already vetoed");
        
        addVoterProposal.vetos.push(voter);
        
        emit AddVoterVetoed(voter);
    }

    function removeRecoveryVoter(address voter) external {
        require(!paused, "Wallet paused");
       _requireFromEntryPointOrOwner();
        require(recoveryVoters[voter], "Address is not a registered voter");
        
        //Check if proposal has been vetoed
        if(removeVoterProposal.vetos.length * 2 >= totalVoters.current()){
            //Create new proposal
            removeVoterProposal.voterAddress = voter;
            removeVoterProposal.proposalTime = block.timestamp;
            delete removeVoterProposal.vetos;
            
            emit RemoveVoterProposed(voter);
            return;
        }

        //Check if proposal time has expired (i.e. proposal has passed without being vetoed)
        if(block.timestamp - removeVoterProposal.proposalTime > 1 days){
            if(voter == removeVoterProposal.voterAddress){
                //Remove voter from registery
                delete recoveryVoters[voter];
                totalVoters.decrement();
                
                //Reset proposal
                removeVoterProposal.voterAddress = address(0);
                removeVoterProposal.proposalTime = 0;
                delete removeVoterProposal.vetos;

                emit VoterRemoved(voter);
                return;
            }
            else{
                //Create new proposal
                removeVoterProposal.voterAddress = voter;
                removeVoterProposal.proposalTime = block.timestamp;
                delete removeVoterProposal.vetos;
                
                emit RemoveVoterProposed(voter);
                return;
            }
        }
        return;
    }

    function vetoRemoval(address voter) external{
        require(!paused, "Wallet paused");
        _requireFromEntryPointOrVoter();
        require(!checkAlreadyVoted(removeVoterProposal.vetos, voter), "Voter already vetoed");
        
        removeVoterProposal.vetos.push(voter);
        
        emit RemoveVoterVetoed(voter);
    }

    /**
     * check current account deposit in the entryPoint
     */
    function getDeposit() public view returns (uint256) {
        return entryPoint().balanceOf(address(this));
    }

    /**
     * deposit more funds for this account in the entryPoint
     */
    function addDeposit() public payable {
        entryPoint().depositTo{value : msg.value}(address(this));
    }

    /**
     * withdraw value from the account's deposit
     * @param withdrawAddress target to send to
     * @param amount to withdraw
     */
    function withdrawDepositTo(address payable withdrawAddress, uint256 amount) public onlyOwner {
        entryPoint().withdrawTo(withdrawAddress, amount);
    }

    function _authorizeUpgrade(address newImplementation) internal view override {
        (newImplementation);
        _onlyOwner();
    }
}
