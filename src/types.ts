import types from "@prisma/client";

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

export type Applicant = types.Applicant;

export type ApplicantWithoutId = Omit<Applicant, "id">;

export type Document = types.Document;

export type DocumentWithoutUrl = Omit<
  Document,
  "url" | "createdAt" | "updatedAt"
>;
export type DocumentWithFile = DocumentWithoutUrl & { uploadedDocument: any };

export type DecodedToken = {
  user_id: number;
  name: string;
  email: string;
  role: types.$Enums.Role[];
};
