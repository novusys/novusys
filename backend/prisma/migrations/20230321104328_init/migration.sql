/*
  Warnings:

  - You are about to drop the column `signers` on the `Account` table. All the data in the column will be lost.
  - Added the required column `signer_id` to the `Account` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Account" DROP COLUMN "signers",
ADD COLUMN     "signer_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_signer_id_fkey" FOREIGN KEY ("signer_id") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
