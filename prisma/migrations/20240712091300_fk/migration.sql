-- DropForeignKey
ALTER TABLE "PhaseDocument" DROP CONSTRAINT "PhaseDocument_documentTypeCode_fkey";

-- AddForeignKey
ALTER TABLE "PhaseDocument" ADD CONSTRAINT "PhaseDocument_documentTypeCode_fkey" FOREIGN KEY ("documentTypeCode") REFERENCES "DocumentType"("code") ON DELETE RESTRICT ON UPDATE CASCADE;
