/*
  Warnings:

  - You are about to drop the column `signer_id` on the `Account` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_signer_id_fkey";

-- AlterTable
ALTER TABLE "Account" DROP COLUMN "signer_id";

-- CreateTable
CREATE TABLE "Signer" (
    "id" SERIAL NOT NULL,
    "signer_id" INTEGER NOT NULL,
    "authorized_id" INTEGER NOT NULL,

    CONSTRAINT "Signer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Signer_id_key" ON "Signer"("id");

-- AddForeignKey
ALTER TABLE "Signer" ADD CONSTRAINT "Signer_signer_id_fkey" FOREIGN KEY ("signer_id") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Signer" ADD CONSTRAINT "Signer_authorized_id_fkey" FOREIGN KEY ("authorized_id") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
