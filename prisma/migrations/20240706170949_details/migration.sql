/*
  Warnings:

  - The primary key for the `DocumentUpdate` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Changed the type of `userId` on the `Applicant` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `verifierId` on the `DocumentUpdate` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Course" AS ENUM ('COMPUTER_SCIENCE', 'ELECTRONICS', 'MECHANICAL', 'ELECTRICAL');

-- CreateEnum
CREATE TYPE "Quota" AS ENUM ('GENERAL', 'SC', 'ST', 'OBC', 'EWS');

-- DropForeignKey
ALTER TABLE "Applicant" DROP CONSTRAINT "Applicant_userId_fkey";

-- DropForeignKey
ALTER TABLE "DocumentUpdate" DROP CONSTRAINT "DocumentUpdate_applicantId_fkey";

-- DropForeignKey
ALTER TABLE "DocumentUpdate" DROP CONSTRAINT "DocumentUpdate_verifierId_fkey";

-- AlterTable
ALTER TABLE "Applicant" DROP COLUMN "userId",
ADD COLUMN     "userId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "DocumentUpdate" DROP CONSTRAINT "DocumentUpdate_pkey",
DROP COLUMN "verifierId",
ADD COLUMN     "verifierId" UUID NOT NULL,
ADD CONSTRAINT "DocumentUpdate_pkey" PRIMARY KEY ("applicantId", "verifierId", "phaseId", "documentTypeCode");

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "Seats" (
    "course" "Course" NOT NULL,
    "quota" "Quota" NOT NULL,
    "seats" INTEGER NOT NULL,

    CONSTRAINT "Seats_pkey" PRIMARY KEY ("course","quota")
);

-- CreateTable
CREATE TABLE "ApplicantDetails" (
    "applicantId" INTEGER NOT NULL,
    "admissionNo" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "gender" TEXT NOT NULL,
    "caste" TEXT NOT NULL,
    "religion" TEXT NOT NULL,
    "nativity" TEXT NOT NULL,
    "community" TEXT NOT NULL,
    "village" TEXT NOT NULL,
    "taluk" TEXT NOT NULL,
    "bloodGroup" TEXT NOT NULL,
    "studentMobile" TEXT NOT NULL,
    "studentEmail" TEXT NOT NULL,
    "annualIncomeOfParents" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ApplicantDetails_pkey" PRIMARY KEY ("applicantId")
);

-- CreateTable
CREATE TABLE "ParentDetails" (
    "fatherName" TEXT NOT NULL,
    "motherName" TEXT NOT NULL,
    "fatherPhone" TEXT NOT NULL,
    "motherPhone" TEXT NOT NULL,
    "fatherEmail" TEXT NOT NULL,
    "motherEmail" TEXT NOT NULL,
    "applicantId" INTEGER NOT NULL,

    CONSTRAINT "ParentDetails_pkey" PRIMARY KEY ("applicantId")
);

-- CreateTable
CREATE TABLE "PermanentAddress" (
    "addressLines" TEXT NOT NULL,
    "postOffice" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "applicantId" INTEGER NOT NULL,

    CONSTRAINT "PermanentAddress_pkey" PRIMARY KEY ("applicantId")
);

-- CreateTable
CREATE TABLE "PresentAddress" (
    "addressLines" TEXT NOT NULL,
    "postOffice" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "applicantId" INTEGER NOT NULL,

    CONSTRAINT "PresentAddress_pkey" PRIMARY KEY ("applicantId")
);

-- CreateTable
CREATE TABLE "GuardianAddress" (
    "addressLines" TEXT NOT NULL,
    "postOffice" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "applicantId" INTEGER NOT NULL,

    CONSTRAINT "GuardianAddress_pkey" PRIMARY KEY ("applicantId")
);

-- CreateTable
CREATE TABLE "PreviousInstitutionDetails" (
    "nameOfInstitution" TEXT NOT NULL,
    "dateOfAdmission" TIMESTAMP(3) NOT NULL,
    "course" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "reservation" TEXT NOT NULL,
    "previousInstitution" TEXT NOT NULL,
    "tcNo" TEXT NOT NULL,
    "tcDate" TIMESTAMP(3) NOT NULL,
    "applicantId" INTEGER NOT NULL,

    CONSTRAINT "PreviousInstitutionDetails_pkey" PRIMARY KEY ("applicantId")
);

-- CreateTable
CREATE TABLE "QualifyingExaminationDetails" (
    "qualifyingExam" TEXT NOT NULL,
    "regNoQualExam" TEXT NOT NULL,
    "qualifyingBoard" TEXT NOT NULL,
    "percentage" DOUBLE PRECISION NOT NULL,
    "yearOfPass" INTEGER NOT NULL,
    "nameOfInstitution" TEXT NOT NULL,
    "applicantId" INTEGER NOT NULL,

    CONSTRAINT "QualifyingExaminationDetails_pkey" PRIMARY KEY ("applicantId")
);

-- CreateTable
CREATE TABLE "MatriculationDetails" (
    "board" TEXT NOT NULL,
    "nameOfInstitution" TEXT NOT NULL,
    "regNoYearOfPass" TEXT NOT NULL,
    "percentage" DOUBLE PRECISION NOT NULL,
    "applicantId" INTEGER NOT NULL,

    CONSTRAINT "MatriculationDetails_pkey" PRIMARY KEY ("applicantId")
);

-- CreateTable
CREATE TABLE "BankDetails" (
    "branch" TEXT NOT NULL,
    "accountNo" TEXT NOT NULL,
    "ifscCode" TEXT NOT NULL,
    "applicantId" INTEGER NOT NULL,

    CONSTRAINT "BankDetails_pkey" PRIMARY KEY ("applicantId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Applicant_userId_key" ON "Applicant"("userId");

-- CreateIndex
CREATE INDEX "DocumentUpdate_verifierId_phaseId_idx" ON "DocumentUpdate"("verifierId", "phaseId");

-- AddForeignKey
ALTER TABLE "Applicant" ADD CONSTRAINT "Applicant_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApplicantDetails" ADD CONSTRAINT "ApplicantDetails_applicantId_fkey" FOREIGN KEY ("applicantId") REFERENCES "Applicant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParentDetails" ADD CONSTRAINT "ParentDetails_applicantId_fkey" FOREIGN KEY ("applicantId") REFERENCES "Applicant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PermanentAddress" ADD CONSTRAINT "PermanentAddress_applicantId_fkey" FOREIGN KEY ("applicantId") REFERENCES "Applicant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PresentAddress" ADD CONSTRAINT "PresentAddress_applicantId_fkey" FOREIGN KEY ("applicantId") REFERENCES "Applicant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GuardianAddress" ADD CONSTRAINT "GuardianAddress_applicantId_fkey" FOREIGN KEY ("applicantId") REFERENCES "Applicant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PreviousInstitutionDetails" ADD CONSTRAINT "PreviousInstitutionDetails_applicantId_fkey" FOREIGN KEY ("applicantId") REFERENCES "Applicant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QualifyingExaminationDetails" ADD CONSTRAINT "QualifyingExaminationDetails_applicantId_fkey" FOREIGN KEY ("applicantId") REFERENCES "Applicant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatriculationDetails" ADD CONSTRAINT "MatriculationDetails_applicantId_fkey" FOREIGN KEY ("applicantId") REFERENCES "Applicant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BankDetails" ADD CONSTRAINT "BankDetails_applicantId_fkey" FOREIGN KEY ("applicantId") REFERENCES "Applicant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocumentUpdate" ADD CONSTRAINT "DocumentUpdate_applicantId_fkey" FOREIGN KEY ("applicantId") REFERENCES "Applicant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocumentUpdate" ADD CONSTRAINT "DocumentUpdate_verifierId_fkey" FOREIGN KEY ("verifierId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
