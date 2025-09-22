/*
  Warnings:

  - You are about to drop the column `platefrom` on the `Content` table. All the data in the column will be lost.
  - You are about to drop the column `crreatedAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `porints` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[clerkId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `platform` to the `Content` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clerkId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Content" DROP COLUMN "platefrom",
ADD COLUMN     "platform" TEXT NOT NULL,
ALTER COLUMN "tone" DROP NOT NULL,
ALTER COLUMN "style" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "crreatedAt",
DROP COLUMN "porints",
ADD COLUMN     "clerkId" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "points" INTEGER NOT NULL DEFAULT 100;

-- CreateIndex
CREATE UNIQUE INDEX "User_clerkId_key" ON "User"("clerkId");
