/*
  Warnings:

  - You are about to drop the `Signer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_Signers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Signer" DROP CONSTRAINT "Signer_signer_id_fkey";

-- DropForeignKey
ALTER TABLE "_Signers" DROP CONSTRAINT "_Signers_A_fkey";

-- DropForeignKey
ALTER TABLE "_Signers" DROP CONSTRAINT "_Signers_B_fkey";

-- AlterTable
CREATE SEQUENCE account_id_seq;
ALTER TABLE "Account" ADD COLUMN     "signers" INTEGER[],
ALTER COLUMN "id" SET DEFAULT nextval('account_id_seq');
ALTER SEQUENCE account_id_seq OWNED BY "Account"."id";

-- AlterTable
CREATE SEQUENCE currency_id_seq;
ALTER TABLE "Currency" ALTER COLUMN "id" SET DEFAULT nextval('currency_id_seq');
ALTER SEQUENCE currency_id_seq OWNED BY "Currency"."id";

-- AlterTable
CREATE SEQUENCE currencyinformation_id_seq;
ALTER TABLE "CurrencyInformation" ALTER COLUMN "id" SET DEFAULT nextval('currencyinformation_id_seq');
ALTER SEQUENCE currencyinformation_id_seq OWNED BY "CurrencyInformation"."id";

-- AlterTable
CREATE SEQUENCE nft_id_seq;
ALTER TABLE "Nft" ALTER COLUMN "id" SET DEFAULT nextval('nft_id_seq');
ALTER SEQUENCE nft_id_seq OWNED BY "Nft"."id";

-- AlterTable
CREATE SEQUENCE nftinformation_id_seq;
ALTER TABLE "NftInformation" ALTER COLUMN "id" SET DEFAULT nextval('nftinformation_id_seq');
ALTER SEQUENCE nftinformation_id_seq OWNED BY "NftInformation"."id";

-- AlterTable
CREATE SEQUENCE transaction_id_seq;
ALTER TABLE "Transaction" ALTER COLUMN "id" SET DEFAULT nextval('transaction_id_seq');
ALTER SEQUENCE transaction_id_seq OWNED BY "Transaction"."id";

-- AlterTable
CREATE SEQUENCE wallet_id_seq;
ALTER TABLE "Wallet" ALTER COLUMN "id" SET DEFAULT nextval('wallet_id_seq');
ALTER SEQUENCE wallet_id_seq OWNED BY "Wallet"."id";

-- DropTable
DROP TABLE "Signer";

-- DropTable
DROP TABLE "_Signers";
