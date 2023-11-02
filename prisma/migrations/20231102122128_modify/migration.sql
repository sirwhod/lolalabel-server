/*
  Warnings:

  - You are about to drop the column `CFLfinishedID` on the `CK_ChecklistFilled` table. All the data in the column will be lost.
  - You are about to drop the column `CFLstartedID` on the `CK_ChecklistFilled` table. All the data in the column will be lost.
  - Added the required column `CFLcreatedAt` to the `CK_ChecklistFilled` table without a default value. This is not possible if the table is not empty.
  - Added the required column `CFidChecklistFilled` to the `CK_ChecklistFinished` table without a default value. This is not possible if the table is not empty.
  - Added the required column `CSidChecklistFilled` to the `CK_ChecklistStarted` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "PCK"."CK_ChecklistFilled" DROP CONSTRAINT "CK_ChecklistFilled_CFLfinishedID_fkey";

-- DropForeignKey
ALTER TABLE "PCK"."CK_ChecklistFilled" DROP CONSTRAINT "CK_ChecklistFilled_CFLstartedID_fkey";

-- AlterTable
ALTER TABLE "PCK"."CK_ChecklistFilled" DROP COLUMN "CFLfinishedID",
DROP COLUMN "CFLstartedID",
ADD COLUMN     "CFLcreatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "PCK"."CK_ChecklistFinished" ADD COLUMN     "CFidChecklistFilled" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "PCK"."CK_ChecklistStarted" ADD COLUMN     "CSidChecklistFilled" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "PCK"."CK_ChecklistStarted" ADD CONSTRAINT "CK_ChecklistStarted_CSidChecklistFilled_fkey" FOREIGN KEY ("CSidChecklistFilled") REFERENCES "PCK"."CK_ChecklistFilled"("CFLid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PCK"."CK_ChecklistFinished" ADD CONSTRAINT "CK_ChecklistFinished_CFidChecklistFilled_fkey" FOREIGN KEY ("CFidChecklistFilled") REFERENCES "PCK"."CK_ChecklistFilled"("CFLid") ON DELETE RESTRICT ON UPDATE CASCADE;
