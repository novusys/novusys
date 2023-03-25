import AWS from 'aws-sdk'
const { KmsSigner } = require('@rumblefishdev/eth-signer-kms');
const { keccak256 } = require('ethereumjs-util');

// Create a new KmsSigner instance with the AWS region and KMS key ID
const signer = new KmsSigner('us-east-1', 'my-kms-key-id');

// Generate a new message to sign
const message = 'Hello, world!';

// Sign the message using AWS KMS
const signature = await signer.signMessage(message);

// Extract the public key from the signature
const publicKey = signature.publicKey;

// Hash the public key using Keccak-256
const publicKeyHash = keccak256(publicKey);

// Take the last 20 bytes of the hash and convert it to an Ethereum address
const address = `0x${publicKeyHash.slice(-20).toString('hex')}`;

console.log(`Signed message: ${message}`);
console.log(`Signature: ${signature.signature}`);
console.log(`Public key: ${publicKey.toString('hex')}`);
console.log(`Address: ${address}`);