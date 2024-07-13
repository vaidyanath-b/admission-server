import { readFileSync } from "fs";
import { supabase } from "../supabase.client";
import multer from "multer";

export const storage = multer;
const getFileExtension = (mimetype: string): string => {
  const mimeParts = mimetype.split("/");
  return mimeParts[mimeParts.length - 1];
};

export const uploadMemoFile = async (
  file: Express.Multer.File,
  applicantId: number,
  allotment: number
) => {
  const extension = getFileExtension(file.mimetype);
  const { data, error } = await supabase.storage
    .from("admission")
    .upload(
      `/${applicantId}/allotment/${allotment}/memo.${extension}`,
      file.buffer,
      {
        contentType: file.mimetype,
        upsert: true,
      }
    );

  if (error) {
    console.error("Error uploading memo to storage:", error);
    throw error;
  }
  return data;
};
export const uploadDocument = async (
  file: Express.Multer.File,
  applicantId: number,
  documentTypeId: string
) => {
  const extension = getFileExtension(file.mimetype);
  const { data, error } = await supabase.storage
    .from("admission")
    .upload(`/${applicantId}/${documentTypeId}.${extension}`, file.buffer, {
      contentType: file.mimetype,
      upsert: true,
    });

  if (error) {
    console.error("Error uploading document to storage:", error);
    throw error;
  }
  return data;
};

export const deleteDocument = async (filepath: string) => {
  const { error } = await supabase.storage
    .from("application")
    .remove([filepath]);
};

export const deleteFiles = async (filepaths: string[]) => {
  const { error } = await supabase.storage
    .from("application")
    .remove(filepaths);

  if (error) {
    throw error;
  }
};

export const getDocument = async (filepath: string) => {
  const { data, error } = await supabase.storage
    .from("application")
    .download(filepath);

  if (error) {
    throw error;
  }
  return data;
};
