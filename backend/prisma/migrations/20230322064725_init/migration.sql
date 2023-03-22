-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "account_settings" TEXT,
ALTER COLUMN "avatar_url" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Transaction" ALTER COLUMN "contract_settings" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Wallet" ALTER COLUMN "abi" SET DATA TYPE TEXT,
ALTER COLUMN "contract_settings" SET DATA TYPE TEXT;
