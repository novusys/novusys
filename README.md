![](https://i.imgur.com/i6jKHVH.png)

![GitHub Workflow Status (with branch)](https://img.shields.io/github/actions/workflow/status/yoshisada/novusys/main.yml?branch=main)

## Prerequisites

- Nest.js
- Prisma
- GraphQL
- Apollo Server 4

## Deployment

https://github.com/novusys/novusys/blob/main/.github/workflows/main.yml
| Key Name                                   | Key Description         |
| ------------------------------------------ | ----------------------- |
| NOVUSYS_PRODUCTION_2_FRONTEND_WEBSITE_ENV  | Front-end URL           |
| NOVUSYS_PRODUCTION_2_PRISMA_ENV            | AWS RDS Database URL    |
| NOVUSYS_PRODUCTION_2_HOSTNAME              | AWS EC2 host name       |
| NOVUSYS_PRODUCTION_2_PRIVATE_KEY           | AWS EC2 SSH private key |
| NOVUSYS_PRODUCTION_2_USERNAME              | AWS EC2 SSH user name   |
 
## Goal
The goal of Novusys is to provide an end-to-end Web3 wallet solution (ERC-4337). Newcomers to Web3 often find the onboarding process to be onerous. Requiring them to setup a crypto wallet, safeguard their private keys, and create an account with an exchange to fund their account. By abstracting wallet creation, funding, and management we can provide a frictionless Web3 experience. We aim to bridge the gap between Web2 and Web3 by allowing users to interact with blockchain in a familiar way.

## Multichain support

## Account abstraction
Account abstraction seeks to improve blockchain user experience by unifying smart contracts and user accounts. Smart contract wallets offer a number of potential benifits compared to traditional EOAs
* Improved security
* Social recovery in the event of lost/compromised keys
* Sponsored transactions
* Transaction batching for reduced gas fees

## Social Authentication
Auth0

## Smart Contract Wallet

**Social Recovery System**
The social recovery system empowers wallet owners to securely transfer wallet ownership in emergency situations, such as a compromised private key. This is achieved by designating recovery voters, who participate in the decision-making process. The wallet owner designates recovery voters, and in case of an emergency, the owner or a recovery voter can propose an ownership transfer. This transfer must receive a majority vote from the recovery voters within 24 hours, and the ownership is transferred. To protect against hijacking, any changes to the recovery voter roll can be vetoed by a majority of existing recovery voters within 24 hours.

**Global Lockdown Signal**
The global lockdown signal provides an additional layer of security for users who choose to opt-in for this feature. By linking their wallet to a special Novusys account, users can enable an emergency lockdown of their account in case of a security breach. This lockdown can manually be lifted by the wallet owner at any time.

**Savings Account**
The savings account feature allows users to automatically divert a user-defined percentage of incoming ETH transfers that exceed a specified threshold to a separate savings account.

## Browser Extension
**Auth0 Authentication**
After setting up a wallet on the novusys website users are able to seamlessly access the novusys wallet Chrome extension to view signers, activity, and initiate actions such as pausing, transferring, and signing.

**Quick Access**
The convenience of a browser extension shines in moments of stress. Users are able to easily access novusys wallet actions within a few clicks, giving them quick access to lockdown procedures alongside wallet details.
