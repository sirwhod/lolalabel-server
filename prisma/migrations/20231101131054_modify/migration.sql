/*
  Warnings:

  - You are about to alter the column `USregistration` on the `CK_User` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - A unique constraint covering the columns `[USregistration]` on the table `CK_User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "PCK"."CK_User" ALTER COLUMN "USregistration" SET DATA TYPE INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "CK_User_USregistration_key" ON "PCK"."CK_User"("USregistration");
