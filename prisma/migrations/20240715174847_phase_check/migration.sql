-- AlterTable
ALTER TABLE "Applicant" ADD COLUMN     "docsComplete" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "infoComplete" BOOLEAN NOT NULL DEFAULT false;
