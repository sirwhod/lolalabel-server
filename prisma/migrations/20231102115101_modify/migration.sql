/*
  Warnings:

  - You are about to drop the column `CFidChecklist` on the `CK_ChecklistFinished` table. All the data in the column will be lost.
  - You are about to drop the column `CFidUser` on the `CK_ChecklistFinished` table. All the data in the column will be lost.
  - Added the required column `CFidUserFinished` to the `CK_ChecklistFinished` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "PCK"."CK_ChecklistFinished" DROP CONSTRAINT "CK_ChecklistFinished_CFidChecklist_fkey";

-- DropForeignKey
ALTER TABLE "PCK"."CK_ChecklistFinished" DROP CONSTRAINT "CK_ChecklistFinished_CFidUser_fkey";

-- DropForeignKey
ALTER TABLE "PCK"."CK_Fill" DROP CONSTRAINT "CK_Fill_FLidChecklistFinished_fkey";

-- AlterTable
ALTER TABLE "PCK"."CK_ChecklistFinished" DROP COLUMN "CFidChecklist",
DROP COLUMN "CFidUser",
ADD COLUMN     "CFidUserFinished" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "PCK"."CK_ChecklistFilled" (
    "CFLid" TEXT NOT NULL,
    "CFLidChecklist" TEXT NOT NULL,
    "CFLStarted" BOOLEAN NOT NULL DEFAULT false,
    "CFLstartedID" TEXT NOT NULL,
    "CFLFinished" BOOLEAN NOT NULL DEFAULT false,
    "CFLfinishedID" TEXT NOT NULL,

    CONSTRAINT "CK_ChecklistFilled_pkey" PRIMARY KEY ("CFLid")
);

-- CreateTable
CREATE TABLE "PCK"."CK_ChecklistStarted" (
    "CSid" TEXT NOT NULL,
    "CSidUserStarted" TEXT NOT NULL,
    "CSstartedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CK_ChecklistStarted_pkey" PRIMARY KEY ("CSid")
);

-- AddForeignKey
ALTER TABLE "PCK"."CK_ChecklistFilled" ADD CONSTRAINT "CK_ChecklistFilled_CFLidChecklist_fkey" FOREIGN KEY ("CFLidChecklist") REFERENCES "PCK"."CK_Checklist"("CLid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PCK"."CK_ChecklistFilled" ADD CONSTRAINT "CK_ChecklistFilled_CFLstartedID_fkey" FOREIGN KEY ("CFLstartedID") REFERENCES "PCK"."CK_ChecklistStarted"("CSid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PCK"."CK_ChecklistFilled" ADD CONSTRAINT "CK_ChecklistFilled_CFLfinishedID_fkey" FOREIGN KEY ("CFLfinishedID") REFERENCES "PCK"."CK_ChecklistFinished"("CFid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PCK"."CK_ChecklistStarted" ADD CONSTRAINT "CK_ChecklistStarted_CSidUserStarted_fkey" FOREIGN KEY ("CSidUserStarted") REFERENCES "PCK"."CK_User"("USid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PCK"."CK_ChecklistFinished" ADD CONSTRAINT "CK_ChecklistFinished_CFidUserFinished_fkey" FOREIGN KEY ("CFidUserFinished") REFERENCES "PCK"."CK_User"("USid") ON DELETE RESTRICT ON UPDATE CASCADE;
