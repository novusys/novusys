/*
  Warnings:

  - You are about to drop the column `nft_id` on the `Nft` table. All the data in the column will be lost.
  - You are about to drop the column `currency_id` on the `NftInformation` table. All the data in the column will be lost.
  - You are about to drop the `_AccountToSigner` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[signer_id]` on the table `Signer` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `signer_id` to the `Signer` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Currency" DROP CONSTRAINT "Currency_currency_id_fkey";

-- DropForeignKey
ALTER TABLE "Nft" DROP CONSTRAINT "Nft_nft_id_fkey";

-- DropForeignKey
ALTER TABLE "NftInformation" DROP CONSTRAINT "NftInformation_currency_id_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_currency_id_fkey";

-- DropForeignKey
ALTER TABLE "_AccountToSigner" DROP CONSTRAINT "_AccountToSigner_A_fkey";

-- DropForeignKey
ALTER TABLE "_AccountToSigner" DROP CONSTRAINT "_AccountToSigner_B_fkey";

-- DropIndex
DROP INDEX "Nft_nft_id_key";

-- DropIndex
DROP INDEX "NftInformation_currency_id_key";

-- DropIndex
DROP INDEX "Transaction_currency_id_key";

-- DropIndex
DROP INDEX "Transaction_wallet_id_key";

-- AlterTable
ALTER TABLE "Nft" DROP COLUMN "nft_id";

-- AlterTable
ALTER TABLE "NftInformation" DROP COLUMN "currency_id";

-- AlterTable
ALTER TABLE "Signer" ADD COLUMN     "signer_id" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_AccountToSigner";

-- CreateTable
CREATE TABLE "_Signers" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_CurrencyToCurrencyInformation" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_CurrencyInformationToNftInformation" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_CurrencyInformationToTransaction" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_NftToNftInformation" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_Signers_AB_unique" ON "_Signers"("A", "B");

-- CreateIndex
CREATE INDEX "_Signers_B_index" ON "_Signers"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CurrencyToCurrencyInformation_AB_unique" ON "_CurrencyToCurrencyInformation"("A", "B");

-- CreateIndex
CREATE INDEX "_CurrencyToCurrencyInformation_B_index" ON "_CurrencyToCurrencyInformation"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CurrencyInformationToNftInformation_AB_unique" ON "_CurrencyInformationToNftInformation"("A", "B");

-- CreateIndex
CREATE INDEX "_CurrencyInformationToNftInformation_B_index" ON "_CurrencyInformationToNftInformation"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CurrencyInformationToTransaction_AB_unique" ON "_CurrencyInformationToTransaction"("A", "B");

-- CreateIndex
CREATE INDEX "_CurrencyInformationToTransaction_B_index" ON "_CurrencyInformationToTransaction"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_NftToNftInformation_AB_unique" ON "_NftToNftInformation"("A", "B");

-- CreateIndex
CREATE INDEX "_NftToNftInformation_B_index" ON "_NftToNftInformation"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Signer_signer_id_key" ON "Signer"("signer_id");

-- AddForeignKey
ALTER TABLE "Signer" ADD CONSTRAINT "Signer_signer_id_fkey" FOREIGN KEY ("signer_id") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Signers" ADD CONSTRAINT "_Signers_A_fkey" FOREIGN KEY ("A") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Signers" ADD CONSTRAINT "_Signers_B_fkey" FOREIGN KEY ("B") REFERENCES "Signer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CurrencyToCurrencyInformation" ADD CONSTRAINT "_CurrencyToCurrencyInformation_A_fkey" FOREIGN KEY ("A") REFERENCES "Currency"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CurrencyToCurrencyInformation" ADD CONSTRAINT "_CurrencyToCurrencyInformation_B_fkey" FOREIGN KEY ("B") REFERENCES "CurrencyInformation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CurrencyInformationToNftInformation" ADD CONSTRAINT "_CurrencyInformationToNftInformation_A_fkey" FOREIGN KEY ("A") REFERENCES "CurrencyInformation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CurrencyInformationToNftInformation" ADD CONSTRAINT "_CurrencyInformationToNftInformation_B_fkey" FOREIGN KEY ("B") REFERENCES "NftInformation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CurrencyInformationToTransaction" ADD CONSTRAINT "_CurrencyInformationToTransaction_A_fkey" FOREIGN KEY ("A") REFERENCES "CurrencyInformation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CurrencyInformationToTransaction" ADD CONSTRAINT "_CurrencyInformationToTransaction_B_fkey" FOREIGN KEY ("B") REFERENCES "Transaction"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_NftToNftInformation" ADD CONSTRAINT "_NftToNftInformation_A_fkey" FOREIGN KEY ("A") REFERENCES "Nft"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_NftToNftInformation" ADD CONSTRAINT "_NftToNftInformation_B_fkey" FOREIGN KEY ("B") REFERENCES "NftInformation"("id") ON DELETE CASCADE ON UPDATE CASCADE;
