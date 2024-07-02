import prisma from "../../prisma/prisma.client";

import { DocumentType } from "../types";

export async function createDocumentType(
  code: string,
  name: string
): Promise<DocumentType> {
  try {
    const documentType: DocumentType = await prisma.documentType.create({
      data: {
        code,
        name,
      },
    });
    return documentType;
  } catch (error) {
    console.error("Error creating documentType:", error);
    throw error;
  }
}
export async function deleteDocumentType(code: string): Promise<void> {
  try {
    await prisma.documentType.delete({ where: { code } });
  } catch (error) {
    console.error("Error deleting documentType:", error);
    throw error;
  }
}
export async function getDocumentTypes(): Promise<DocumentType[]> {
  try {
    const documentTypes = await prisma.documentType.findMany();
    return documentTypes;
  } catch (error) {
    console.error("Error getting documentTypes:", error);
    throw error;
  }
}
export async function getDocumentType(code: string): Promise<DocumentType> {
  try {
    const documentType = await prisma.documentType.findUnique({
      where: { code },
    });
    if (!documentType) {
      throw new Error("DocumentType not found");
    }
    return documentType;
  } catch (error) {
    console.error("Error getting documentType:", error);
    throw error;
  }
}
export async function updateDocumentType(
  code: string,
  name: string
): Promise<DocumentType> {
  try {
    const documentType: DocumentType = await prisma.documentType.update({
      where: { code },
      data: { name },
    });
    return documentType;
  } catch (error) {
    console.error("Error updating documentType:", error);
    throw error;
  }
}
