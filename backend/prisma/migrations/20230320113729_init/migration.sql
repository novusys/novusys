/*
  Warnings:

  - You are about to drop the `_CurrencyInformationToNftInformation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CurrencyInformationToTransaction` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_NftToNftInformation` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `nft_information_id` to the `Nft` table without a default value. This is not possible if the table is not empty.
  - Added the required column `currency_id` to the `NftInformation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_CurrencyInformationToNftInformation" DROP CONSTRAINT "_CurrencyInformationToNftInformation_A_fkey";

-- DropForeignKey
ALTER TABLE "_CurrencyInformationToNftInformation" DROP CONSTRAINT "_CurrencyInformationToNftInformation_B_fkey";

-- DropForeignKey
ALTER TABLE "_CurrencyInformationToTransaction" DROP CONSTRAINT "_CurrencyInformationToTransaction_A_fkey";

-- DropForeignKey
ALTER TABLE "_CurrencyInformationToTransaction" DROP CONSTRAINT "_CurrencyInformationToTransaction_B_fkey";

-- DropForeignKey
ALTER TABLE "_NftToNftInformation" DROP CONSTRAINT "_NftToNftInformation_A_fkey";

-- DropForeignKey
ALTER TABLE "_NftToNftInformation" DROP CONSTRAINT "_NftToNftInformation_B_fkey";

-- AlterTable
ALTER TABLE "Nft" ADD COLUMN     "nft_information_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "NftInformation" ADD COLUMN     "currency_id" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_CurrencyInformationToNftInformation";

-- DropTable
DROP TABLE "_CurrencyInformationToTransaction";

-- DropTable
DROP TABLE "_NftToNftInformation";

-- AddForeignKey
ALTER TABLE "Nft" ADD CONSTRAINT "Nft_nft_information_id_fkey" FOREIGN KEY ("nft_information_id") REFERENCES "NftInformation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NftInformation" ADD CONSTRAINT "NftInformation_currency_id_fkey" FOREIGN KEY ("currency_id") REFERENCES "CurrencyInformation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_currency_id_fkey" FOREIGN KEY ("currency_id") REFERENCES "CurrencyInformation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
