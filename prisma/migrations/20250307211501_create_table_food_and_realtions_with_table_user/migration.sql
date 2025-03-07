/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `User` table. All the data in the column will be lost.
  - The required column `userId` was added to the `User` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "id",
ADD COLUMN     "userId" TEXT NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("userId");

-- CreateTable
CREATE TABLE "Food" (
    "foodId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "imgUrl" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "ingredients" TEXT[],
    "UserId" TEXT,

    CONSTRAINT "Food_pkey" PRIMARY KEY ("foodId")
);

-- AddForeignKey
ALTER TABLE "Food" ADD CONSTRAINT "Food_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "User"("userId") ON DELETE SET NULL ON UPDATE CASCADE;
