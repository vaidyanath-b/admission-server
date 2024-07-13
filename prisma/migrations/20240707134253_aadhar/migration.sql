/*
  Warnings:

  - Added the required column `aadharNo` to the `MatriculationDetails` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MatriculationDetails" ADD COLUMN     "aadharNo" TEXT NOT NULL;
