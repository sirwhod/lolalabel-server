/*
  Warnings:

  - You are about to drop the column `FLcreatedAt` on the `CK_Fill` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PCK"."CK_Fill" DROP COLUMN "FLcreatedAt",
ADD COLUMN     "FLfilledAt" TIMESTAMP(3),
ALTER COLUMN "FLresponse" DROP NOT NULL,
ALTER COLUMN "FLcomment" DROP NOT NULL;
