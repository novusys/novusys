/*
  Warnings:

  - You are about to drop the `_CurrencyToCurrencyInformation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CurrencyToCurrencyInformation" DROP CONSTRAINT "_CurrencyToCurrencyInformation_A_fkey";

-- DropForeignKey
ALTER TABLE "_CurrencyToCurrencyInformation" DROP CONSTRAINT "_CurrencyToCurrencyInformation_B_fkey";

-- DropTable
DROP TABLE "_CurrencyToCurrencyInformation";

-- AddForeignKey
ALTER TABLE "Currency" ADD CONSTRAINT "Currency_currency_id_fkey" FOREIGN KEY ("currency_id") REFERENCES "CurrencyInformation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
