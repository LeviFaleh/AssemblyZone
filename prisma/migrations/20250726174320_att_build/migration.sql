/*
  Warnings:

  - Added the required column `content` to the `Build` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Build" ADD COLUMN     "content" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
