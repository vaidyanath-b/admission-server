-- CreateTable
CREATE TABLE "Allotment" (
    "allotment" INTEGER NOT NULL,
    "applicantId" INTEGER NOT NULL,
    "course" "Course" NOT NULL,
    "quota" "Quota" NOT NULL,
    "allotmentMemoLink" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Allotment_pkey" PRIMARY KEY ("applicantId","allotment")
);

-- AddForeignKey
ALTER TABLE "Allotment" ADD CONSTRAINT "Allotment_applicantId_fkey" FOREIGN KEY ("applicantId") REFERENCES "Applicant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
