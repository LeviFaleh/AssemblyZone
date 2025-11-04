/*
  Warnings:

  - A unique constraint covering the columns `[gunplaName,userId]` on the table `Build` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Build_gunplaName_key";

-- CreateIndex
CREATE UNIQUE INDEX "Build_gunplaName_userId_key" ON "Build"("gunplaName", "userId");
