/*
  Warnings:

  - You are about to drop the column `owner_id` on the `Signer` table. All the data in the column will be lost.
  - You are about to drop the column `signer_id` on the `Signer` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Signer" DROP CONSTRAINT "Signer_owner_id_fkey";

-- AlterTable
ALTER TABLE "Signer" DROP COLUMN "owner_id",
DROP COLUMN "signer_id";

-- CreateTable
CREATE TABLE "_AccountToSigner" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_AccountToSigner_AB_unique" ON "_AccountToSigner"("A", "B");

-- CreateIndex
CREATE INDEX "_AccountToSigner_B_index" ON "_AccountToSigner"("B");

-- AddForeignKey
ALTER TABLE "_AccountToSigner" ADD CONSTRAINT "_AccountToSigner_A_fkey" FOREIGN KEY ("A") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AccountToSigner" ADD CONSTRAINT "_AccountToSigner_B_fkey" FOREIGN KEY ("B") REFERENCES "Signer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
