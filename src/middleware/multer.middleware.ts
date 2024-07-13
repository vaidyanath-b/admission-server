// uploadMiddleware.ts
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 50, // 50 MB limit
    fieldSize: 1024 * 1024 * 30, // 30 MB limit for individual fields
  },
});

export default upload;
