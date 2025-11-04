/*
  Warnings:

  - Added the required column `title` to the `Build` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Build" ADD COLUMN     "title" TEXT NOT NULL;
