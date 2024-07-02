import types, { Applicant } from "@prisma/client";

export type DocumentType = types.DocumentType;
type ApplicantPhaseStatusList = types.Applicant & {
  DocumentUpdate: ApplicantDocumentUpdateStatus[];
};
type ApplicantDocumentUpdateStatus = {
  documentTypeCode: string;
  verification: boolean;
};
export type PhaseWithApplicants = {
  order: number;
  name: string;
  description: string;
  Applicant: ApplicantPhaseStatusList[];
} | null;
export type Phase = types.Phase;

export type ApplicantPhaseDocuments =
  | (Applicant & {
      DocumentUpdate: DocumentUpdatesWithDocumentAndType[];
    })
  | null;

type DocumentUpdatesWithDocumentAndType = types.DocumentUpdate & {
  Document: types.Document;
  DocumentType: types.DocumentType;
};

export type PhaseWithDocumentTypes = Phase & {
  DocumentsRequired: (types.PhaseDocument & {
    DocumentType: types.DocumentType;
  })[];
};
