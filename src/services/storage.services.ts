import { readFileSync } from "fs";
import { supabase } from "../supabase.client";
import multer from "multer";

export const storage = multer;

export const uploadDocument = async (
  file: Express.Multer.File,
  applicantId: number,
  documentTypeId: string
) => {
  const { data, error } = await supabase.storage
    .from("application")
    .upload(
      `/${applicantId}/${documentTypeId}.${file.mimetype}}`,
      file.buffer,
      {
        contentType: file.mimetype,
        upsert: false,
      }
    );

  if (error) {
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
