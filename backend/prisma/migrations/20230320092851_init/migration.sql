-- CreateTable
CREATE TABLE "Account" (
    "id" INTEGER NOT NULL,
    "user_id" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "user_name" TEXT NOT NULL,
    "account_type" TEXT NOT NULL,
    "avatar_url" TEXT NOT NULL,
    "account_settings" JSONB,
    "secondary_address" TEXT NOT NULL,
    "activity" TEXT[],

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Signer" (
    "id" INTEGER NOT NULL,
    "owner_id" INTEGER NOT NULL,
    "signer_id" INTEGER NOT NULL,

    CONSTRAINT "Signer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Currency" (
    "id" INTEGER NOT NULL,
    "uuid" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "currency_id" INTEGER NOT NULL,
    "count" INTEGER NOT NULL,
    "wallet_id" INTEGER NOT NULL,

    CONSTRAINT "Currency_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CurrencyInformation" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "ticker" TEXT NOT NULL,
    "chain_id" INTEGER NOT NULL,

    CONSTRAINT "CurrencyInformation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Wallet" (
    "id" INTEGER NOT NULL,
    "address" TEXT NOT NULL,
    "chain_id" INTEGER NOT NULL,
    "abi" JSONB,
    "owner_id" INTEGER NOT NULL,
    "contract_settings" JSONB,
    "gas_saved" INTEGER NOT NULL,

    CONSTRAINT "Wallet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Nft" (
    "id" INTEGER NOT NULL,
    "uuid" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "nft_id" INTEGER NOT NULL,
    "wallet_id" INTEGER NOT NULL,

    CONSTRAINT "Nft_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NftInformation" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "chain_id" INTEGER NOT NULL,
    "currency_id" INTEGER NOT NULL,
    "currency_count" INTEGER NOT NULL,

    CONSTRAINT "NftInformation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" INTEGER NOT NULL,
    "hash" TEXT NOT NULL,
    "chain_id" INTEGER NOT NULL,
    "type" INTEGER NOT NULL,
    "contract_settings" JSONB,
    "currency_id" INTEGER NOT NULL,
    "currency_count" INTEGER NOT NULL,
    "wallet_id" INTEGER NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_NftToTransaction" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_id_key" ON "Account"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Account_user_id_key" ON "Account"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Account_address_key" ON "Account"("address");

-- CreateIndex
CREATE UNIQUE INDEX "Account_user_name_key" ON "Account"("user_name");

-- CreateIndex
CREATE UNIQUE INDEX "Signer_id_key" ON "Signer"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Currency_id_key" ON "Currency"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Currency_uuid_key" ON "Currency"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "Currency_currency_id_key" ON "Currency"("currency_id");

-- CreateIndex
CREATE UNIQUE INDEX "CurrencyInformation_id_key" ON "CurrencyInformation"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Wallet_id_key" ON "Wallet"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Wallet_address_key" ON "Wallet"("address");

-- CreateIndex
CREATE UNIQUE INDEX "Nft_id_key" ON "Nft"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Nft_uuid_key" ON "Nft"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "Nft_nft_id_key" ON "Nft"("nft_id");

-- CreateIndex
CREATE UNIQUE INDEX "NftInformation_id_key" ON "NftInformation"("id");

-- CreateIndex
CREATE UNIQUE INDEX "NftInformation_currency_id_key" ON "NftInformation"("currency_id");

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_id_key" ON "Transaction"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_hash_key" ON "Transaction"("hash");

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_currency_id_key" ON "Transaction"("currency_id");

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_wallet_id_key" ON "Transaction"("wallet_id");

-- CreateIndex
CREATE UNIQUE INDEX "_NftToTransaction_AB_unique" ON "_NftToTransaction"("A", "B");

-- CreateIndex
CREATE INDEX "_NftToTransaction_B_index" ON "_NftToTransaction"("B");

-- AddForeignKey
ALTER TABLE "Signer" ADD CONSTRAINT "Signer_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Currency" ADD CONSTRAINT "Currency_currency_id_fkey" FOREIGN KEY ("currency_id") REFERENCES "CurrencyInformation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Currency" ADD CONSTRAINT "Currency_wallet_id_fkey" FOREIGN KEY ("wallet_id") REFERENCES "Wallet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Wallet" ADD CONSTRAINT "Wallet_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Nft" ADD CONSTRAINT "Nft_nft_id_fkey" FOREIGN KEY ("nft_id") REFERENCES "NftInformation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Nft" ADD CONSTRAINT "Nft_wallet_id_fkey" FOREIGN KEY ("wallet_id") REFERENCES "Wallet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NftInformation" ADD CONSTRAINT "NftInformation_currency_id_fkey" FOREIGN KEY ("currency_id") REFERENCES "CurrencyInformation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_currency_id_fkey" FOREIGN KEY ("currency_id") REFERENCES "CurrencyInformation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_wallet_id_fkey" FOREIGN KEY ("wallet_id") REFERENCES "Wallet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_NftToTransaction" ADD CONSTRAINT "_NftToTransaction_A_fkey" FOREIGN KEY ("A") REFERENCES "Nft"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_NftToTransaction" ADD CONSTRAINT "_NftToTransaction_B_fkey" FOREIGN KEY ("B") REFERENCES "Transaction"("id") ON DELETE CASCADE ON UPDATE CASCADE;
