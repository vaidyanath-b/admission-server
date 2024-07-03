import { Request, Response } from "express";
import documentTypeFns from "../services/documentType.services";
import { DocumentType } from "../types";

export async function createDocumentTypeController(
  req: Request<{}, {}, DocumentType>,
  res: Response
) {
  try {
    const { code, name } = req.body;
    const documentType = await documentTypeFns.createDocumentType(code, name);
    res.json(documentType);
  } catch (error) {
    console.error("Error creating document type:", error);
    res.status(500).json({ message: "Error creating document type" });
  }
}

export async function deleteDocumentTypeController(
  req: Request<{ code: string }>,
  res: Response
) {
  try {
    const { code } = req.params;
    await documentTypeFns.deleteDocumentType(code);
    res.json({ message: "Document type deleted successfully" });
  } catch (error) {
    console.error("Error deleting document type:", error);
    res.status(500).json({ message: "Error deleting document type" });
  }
}

export async function getDocumentTypesController(req: Request, res: Response) {
  try {
    const documentTypes = await documentTypeFns.getDocumentTypes();
    res.json(documentTypes);
  } catch (error) {
    console.error("Error getting document types:", error);
    res.status(500).json({ message: "Error getting document types" });
  }
}

export async function getDocumentTypeController(
  req: Request<{ code: string }>,
  res: Response
) {
  try {
    const { code } = req.params;
    const documentType = await documentTypeFns.getDocumentType(code);
    res.json(documentType);
  } catch (error: any) {
    console.error("Error getting document type:", error);
    if (error.message === "DocumentType not found") {
      res.status(404).json({ message: "Document type not found" });
    } else {
      res.status(500).json({ message: "Error getting document type" });
    }
  }
}

export async function updateDocumentTypeController(
  req: Request<{ code: string }, {}, { name: string }>,
  res: Response
) {
  try {
    const { code } = req.params;
    const { name } = req.body;
    const documentType = await documentTypeFns.updateDocumentType(code, name);
    res.json(documentType);
  } catch (error: any) {
    console.error("Error updating document type:", error);
    if (error.message === "DocumentType not found") {
      res.status(404).json({ message: "Document type not found" });
    } else {
      res.status(500).json({ message: "Error updating document type" });
    }
  }
}

export default {
  createDocumentTypeController,
  deleteDocumentTypeController,
  getDocumentTypesController,
  getDocumentTypeController,
  updateDocumentTypeController,
};
