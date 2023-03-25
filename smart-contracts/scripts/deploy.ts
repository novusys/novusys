import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  // Deploy NovusysAccount contract
  const NovusysAccount = await ethers.getContractFactory("NovusysAccount");
  const novusysAccount = await NovusysAccount.deploy("0x0576a174D229E3cFA37253523E645A78A0C91B57");

  await novusysAccount.deployed();

  console.log("NovusysAccount deployed to:", novusysAccount.address);
  await novusysAccount.deployTransaction.wait(6);
  try{
    await run(`verify:verify`, {
      address: novusysAccount.address,
      constructorArguments: ["0x0576a174D229E3cFA37253523E645A78A0C91B57"],
    });
  }catch(error){
    console.log(error)
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
