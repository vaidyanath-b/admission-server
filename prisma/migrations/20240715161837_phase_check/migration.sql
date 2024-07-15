-- AlterTable
ALTER TABLE "PhaseDocument" ADD COLUMN     "includedQuotas" "Quota"[] DEFAULT ARRAY['GENERAL', 'SC', 'ST', 'OBC', 'EWS']::"Quota"[];
