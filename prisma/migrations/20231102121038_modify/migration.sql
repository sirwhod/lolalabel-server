/*
  Warnings:

  - You are about to drop the column `FLidChecklistFinished` on the `CK_Fill` table. All the data in the column will be lost.
  - Added the required column `FLidChecklistFilled` to the `CK_Fill` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PCK"."CK_Fill" DROP COLUMN "FLidChecklistFinished",
ADD COLUMN     "FLidChecklistFilled" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "PCK"."CK_Fill" ADD CONSTRAINT "CK_Fill_FLidChecklistFilled_fkey" FOREIGN KEY ("FLidChecklistFilled") REFERENCES "PCK"."CK_ChecklistFilled"("CFLid") ON DELETE RESTRICT ON UPDATE CASCADE;
