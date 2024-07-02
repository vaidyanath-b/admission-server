-- CreateEnum
CREATE TYPE "Role" AS ENUM ('VERIFIER_1', 'VERIFIER_2', 'ADMIN', 'APPLICANT');

-- CreateTable
CREATE TABLE "DocumentType" (
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "DocumentType_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'APPLICANT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Applicant" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "firstName" TEXT NOT NULL,
    "currentPhaseId" INTEGER,
    "lastName" TEXT NOT NULL,

    CONSTRAINT "Applicant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Phase" (
    "order" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Phase_pkey" PRIMARY KEY ("order")
);

-- CreateTable
CREATE TABLE "PhaseDocument" (
    "phaseId" INTEGER NOT NULL,
    "documentTypeCode" TEXT NOT NULL,

    CONSTRAINT "PhaseDocument_pkey" PRIMARY KEY ("phaseId","documentTypeCode")
);

-- CreateTable
CREATE TABLE "Document" (
    "applicantId" INTEGER NOT NULL,
    "filename" TEXT NOT NULL,
    "url" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "documentTypeCode" TEXT NOT NULL,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("applicantId","documentTypeCode")
);

-- CreateTable
CREATE TABLE "DocumentUpdate" (
    "phaseId" INTEGER NOT NULL,
    "applicantId" INTEGER NOT NULL,
    "verifierId" INTEGER NOT NULL,
    "verification" BOOLEAN NOT NULL DEFAULT false,
    "remark" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "documentTypeCode" TEXT NOT NULL,

    CONSTRAINT "DocumentUpdate_pkey" PRIMARY KEY ("applicantId","verifierId","phaseId","documentTypeCode")
);

-- CreateIndex
CREATE UNIQUE INDEX "DocumentType_code_key" ON "DocumentType"("code");

-- CreateIndex
CREATE UNIQUE INDEX "DocumentType_name_key" ON "DocumentType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Applicant_userId_key" ON "Applicant"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Phase_name_key" ON "Phase"("name");

-- CreateIndex
CREATE INDEX "DocumentUpdate_documentTypeCode_idx" ON "DocumentUpdate"("documentTypeCode");

-- CreateIndex
CREATE INDEX "DocumentUpdate_verifierId_phaseId_idx" ON "DocumentUpdate"("verifierId", "phaseId");

-- CreateIndex
CREATE INDEX "DocumentUpdate_applicantId_idx" ON "DocumentUpdate"("applicantId");

-- AddForeignKey
ALTER TABLE "Applicant" ADD CONSTRAINT "Applicant_currentPhaseId_fkey" FOREIGN KEY ("currentPhaseId") REFERENCES "Phase"("order") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Applicant" ADD CONSTRAINT "Applicant_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PhaseDocument" ADD CONSTRAINT "PhaseDocument_phaseId_fkey" FOREIGN KEY ("phaseId") REFERENCES "Phase"("order") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PhaseDocument" ADD CONSTRAINT "PhaseDocument_documentTypeCode_fkey" FOREIGN KEY ("documentTypeCode") REFERENCES "DocumentType"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_applicantId_fkey" FOREIGN KEY ("applicantId") REFERENCES "Applicant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_documentTypeCode_fkey" FOREIGN KEY ("documentTypeCode") REFERENCES "DocumentType"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocumentUpdate" ADD CONSTRAINT "DocumentUpdate_applicantId_fkey" FOREIGN KEY ("applicantId") REFERENCES "Applicant"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocumentUpdate" ADD CONSTRAINT "DocumentUpdate_applicantId_documentTypeCode_fkey" FOREIGN KEY ("applicantId", "documentTypeCode") REFERENCES "Document"("applicantId", "documentTypeCode") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocumentUpdate" ADD CONSTRAINT "DocumentUpdate_phaseId_fkey" FOREIGN KEY ("phaseId") REFERENCES "Phase"("order") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocumentUpdate" ADD CONSTRAINT "DocumentUpdate_phaseId_documentTypeCode_fkey" FOREIGN KEY ("phaseId", "documentTypeCode") REFERENCES "PhaseDocument"("phaseId", "documentTypeCode") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocumentUpdate" ADD CONSTRAINT "DocumentUpdate_verifierId_fkey" FOREIGN KEY ("verifierId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocumentUpdate" ADD CONSTRAINT "DocumentUpdate_documentTypeCode_fkey" FOREIGN KEY ("documentTypeCode") REFERENCES "DocumentType"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
