/*
  Warnings:

  - You are about to drop the column `UserId` on the `Food` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- DropForeignKey
ALTER TABLE "Food" DROP CONSTRAINT "Food_UserId_fkey";

-- AlterTable
ALTER TABLE "Food" DROP COLUMN "UserId";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER';

-- CreateTable
CREATE TABLE "Favorite" (
    "userId" TEXT NOT NULL,
    "foodId" TEXT NOT NULL,

    CONSTRAINT "Favorite_pkey" PRIMARY KEY ("userId","foodId")
);

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_foodId_fkey" FOREIGN KEY ("foodId") REFERENCES "Food"("foodId") ON DELETE RESTRICT ON UPDATE CASCADE;
