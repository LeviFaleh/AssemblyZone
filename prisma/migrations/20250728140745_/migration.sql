/*
  Warnings:

  - You are about to drop the column `imagePath` on the `Build` table. All the data in the column will be lost.
  - You are about to drop the column `imagePath` on the `Gunpla` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Build" DROP COLUMN "imagePath",
ADD COLUMN     "imagePaths" TEXT[];

-- AlterTable
ALTER TABLE "Gunpla" DROP COLUMN "imagePath",
ADD COLUMN     "imagePaths" TEXT[];
