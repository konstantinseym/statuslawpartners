import multer from "multer";
import path from "path";

const UPLOADS_DIR = path.resolve("uploads");

const defaultStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOADS_DIR),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});

const heroBGStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOADS_DIR),
  filename: (req, file, cb) => cb(null, "bg00.png"),
});

const policyStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOADS_DIR),
  filename: (req, file, cb) => cb(null, "policy.pdf"),
});

export const upload = multer({
  storage: defaultStorage,
  limits: { fileSize: 10 * 1024 * 1024 },
});

export const uploadHeroBG = multer({
  storage: heroBGStorage,
  limits: { fileSize: 10 * 1024 * 1024 },
});

export const uploadPolicy = multer({
  storage: policyStorage,
  limits: { fileSize: 10 * 1024 * 1024 },
});
