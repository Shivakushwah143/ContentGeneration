/*
  Warnings:

  - The values [BASIC,PREMIUM] on the enum `PlanType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `points` on the `User` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "PlanType_new" AS ENUM ('FREE', 'PRO', 'BUSINESS');
ALTER TABLE "User" ALTER COLUMN "plan" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "plan" TYPE "PlanType_new" USING ("plan"::text::"PlanType_new");
ALTER TABLE "Payment" ALTER COLUMN "plan" TYPE "PlanType_new" USING ("plan"::text::"PlanType_new");
ALTER TYPE "PlanType" RENAME TO "PlanType_old";
ALTER TYPE "PlanType_new" RENAME TO "PlanType";
DROP TYPE "PlanType_old";
ALTER TABLE "User" ALTER COLUMN "plan" SET DEFAULT 'FREE';
COMMIT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "points",
ADD COLUMN     "creditsRemaining" INTEGER NOT NULL DEFAULT 50,
ADD COLUMN     "subscriptionEndDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "subscriptionStartDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
