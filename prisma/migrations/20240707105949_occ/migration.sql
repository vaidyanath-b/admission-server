/*
  Warnings:

  - Added the required column `fatherOccupation` to the `ParentDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `motherOccupation` to the `ParentDetails` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ParentDetails" ADD COLUMN     "fatherOccupation" TEXT NOT NULL,
ADD COLUMN     "motherOccupation" TEXT NOT NULL;
