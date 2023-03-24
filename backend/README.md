## Description

Novusys backend

## Installation

```bash
$ cd novusys/backend
$ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
$ nvm install node # for Ubuntu 22.04
# $ nvm install 16.19.1 # for Ubuntu 18.04
$ npm i
# copy .env with current login credentials
```
## Generation Steps
```
## Prisma code generation
$ npx nest generate module prisma
$ npx nest generate service prisma

## Database migration
$ npx prisma migrate dev --name init

## Generates Prisma Client CRUD operations
$ prisma generate  
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod

```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov

# test GraphQL

mutation createAccount {
  createAccount(data:{user_id:"3",address:"addr3",user_name:"user3",account_type:"account type",avatar_url:"url",account_settings:"settings",secondary_address:"secondary",activity:""}){
    count
  }
}
mutation createWallet{
  createWallet(data:{address:"addr",chain_id:111,abi:"abi",owner_id:1,contract_settings:"",gas_saved:222}){
    count
  }
}
query Wallet1 {
  Wallet(id:1) { owner_id,address,chain_id,abi,contract_settings,gas_saved,__typename}
}
query Wallets {
  Wallets { id,owner_id,address,chain_id,abi,contract_settings,gas_saved,__typename}
}
query Accounts {
  Accounts { id, user_id,address,user_name,account_type,avatar_url,account_settings,secondary_address,activity}
}

mutation createSigner {
  createSigner(data:{signer_id:1,authorized_id:7}) {
    count
  }
}

query Signers {
  Signers { id,signer_id,authorized_id }
}

# test AWS RDS
$ psql -h novusys-dev.cky9ffqjqe5i.us-east-2.rds.amazonaws.com -U postgres
Password for user postgres: 
psql (14.7 (Ubuntu 14.7-0ubuntu0.22.04.1), server 14.6)
SSL connection (protocol: TLSv1.2, cipher: ECDHE-RSA-AES256-GCM-SHA384, bits: 256, compression: off)
Type "help" for help.

postgres=> \c novusys-dev
psql (14.7 (Ubuntu 14.7-0ubuntu0.22.04.1), server 14.6)
SSL connection (protocol: TLSv1.2, cipher: ECDHE-RSA-AES256-GCM-SHA384, bits: 256, compression: off)
You are now connected to database "novusys-dev" as user "postgres".
novusys-dev=> \dt
                List of relations
 Schema |        Name         | Type  |  Owner   
--------+---------------------+-------+----------
 public | Account             | table | postgres
 public | Currency            | table | postgres
 public | CurrencyInformation | table | postgres
 public | Nft                 | table | postgres
 public | NftInformation      | table | postgres
 public | Signer              | table | postgres
 public | Transaction         | table | postgres
 public | Wallet              | table | postgres
 public | _NftToTransaction   | table | postgres
 public | _prisma_migrations  | table | postgres
(10 rows)

novusys-dev=> \d "Account";
                    Table "public.Account"
      Column       |  Type   | Collation | Nullable | Default 
-------------------+---------+-----------+----------+---------
 id                | integer |           | not null | 
 user_id           | text    |           | not null | 
 address           | text    |           | not null | 
 user_name         | text    |           | not null | 
 account_type      | text    |           | not null | 
 avatar_url        | text    |           | not null | 
 account_settings  | jsonb   |           |          | 
 secondary_address | text    |           | not null | 
 activity          | text[]  |           |          | 
Indexes:
    "Account_pkey" PRIMARY KEY, btree (id)
    "Account_address_key" UNIQUE, btree (address)
    "Account_id_key" UNIQUE, btree (id)
    "Account_user_id_key" UNIQUE, btree (user_id)
    "Account_user_name_key" UNIQUE, btree (user_name)
Referenced by:
    TABLE ""Signer"" CONSTRAINT "Signer_signer_id_fkey" FOREIGN KEY (signer_id) REFERENCES "Account"(id) ON UPDATE CASCADE ON DELETE RESTRICT
    TABLE ""Wallet"" CONSTRAINT "Wallet_owner_id_fkey" FOREIGN KEY (owner_id) REFERENCES "Account"(id) ON UPDATE CASCADE ON DELETE RESTRICT
    TABLE ""_Signers"" CONSTRAINT "_Signers_A_fkey" FOREIGN KEY ("A") REFERENCES "Account"(id) ON UPDATE CASCADE ON DELETE CASCADE

novusys-dev=> \d "Wallet";
                    Table "public.Wallet"
      Column       |  Type   | Collation | Nullable | Default 
-------------------+---------+-----------+----------+---------
 id                | integer |           | not null | 
 address           | text    |           | not null | 
 chain_id          | integer |           | not null | 
 abi               | jsonb   |           |          | 
 owner_id          | integer |           | not null | 
 contract_settings | jsonb   |           |          | 
 gas_saved         | integer |           | not null | 
Indexes:
    "Wallet_pkey" PRIMARY KEY, btree (id)
    "Wallet_address_key" UNIQUE, btree (address)
    "Wallet_id_key" UNIQUE, btree (id)
Foreign-key constraints:
    "Wallet_owner_id_fkey" FOREIGN KEY (owner_id) REFERENCES "Account"(id) ON UPDATE CASCADE ON DELETE RESTRICT
Referenced by:
    TABLE ""Currency"" CONSTRAINT "Currency_wallet_id_fkey" FOREIGN KEY (wallet_id) REFERENCES "Wallet"(id) ON UPDATE CASCADE ON DELETE RESTRICT
    TABLE ""Nft"" CONSTRAINT "Nft_wallet_id_fkey" FOREIGN KEY (wallet_id) REFERENCES "Wallet"(id) ON UPDATE CASCADE ON DELETE RESTRICT
    TABLE ""Transaction"" CONSTRAINT "Transaction_wallet_id_fkey" FOREIGN KEY (wallet_id) REFERENCES "Wallet"(id) ON UPDATE CASCADE ON DELETE RESTRICT

novusys-dev=> quit
```

## Support

## Stay in touch

- Author - 
- Website - 
- Twitter - 

## License
