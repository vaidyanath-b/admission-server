-- AlterTable
ALTER TABLE "Allotment" ADD COLUMN     "verified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "verifiedBy" UUID;

-- AddForeignKey
ALTER TABLE "Allotment" ADD CONSTRAINT "Allotment_verifiedBy_fkey" FOREIGN KEY ("verifiedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
