import multer from "multer";
import path from "path";
import fs from "fs";

// Function to ensure directory exists.
const ensureDirectoryExists = (directory) => {
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }
};

// Function to create a Multer storage configuration based on dynamic fields
const createStorage = (destinationPath) =>
  multer.diskStorage({
    destination: (req, file, cb) => {
      ensureDirectoryExists(destinationPath); // Ensure the directory exists
      cb(null, destinationPath);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      const fileName =
        file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname);
      cb(null, fileName);
    },
  });

// Function to create a file filter
const fileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png|mp4|gif|webp|pdf|doc|docx|xls|xlsx|csv/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Only .jpeg, .jpg, .png, .gif, .pdf, .doc, .docx, .xls, .webp, .xlsx, .mp4, .csv formats are allowed!"
      )
    );
  }
};

// Reusable multiple file upload function
export const multipleUpload = (fieldName, maxCount, destinationPath) => {
  ensureDirectoryExists(destinationPath); // Ensure the directory exists

  return multer({
    storage: createStorage(destinationPath),
    fileFilter: fileFilter,
    limits: { fileSize: 1024 * 1024 * 5 }, // 5MB file size limit
  }).array(fieldName, maxCount);
};

// Specific upload functions
export const upload = (fields) => {
  const multerFields = fields.map((field) => ({
    name: field.name,
    maxCount: 1,
  }));

  ensureDirectoryExists(fields[0].path); // Ensure the directory exists

  return multer({
    storage: createStorage(fields[0].path),
    fileFilter: fileFilter,
    limits: { fileSize: 1024 * 1024 * 5 }, // 5MB file size limit
  }).fields(multerFields);
};




export const video = (fields) => {
  const multerFields = fields.map((field) => ({
    name: field.name,
    maxCount: 1,
  }));

  ensureDirectoryExists(fields[0].path); // Ensure the directory exists

  return multer({
    storage: createStorage(fields[0].path),
    fileFilter: fileFilter,
    limits: { fileSize: 1024 * 1024 * 500 }, // 500MB file size limit for videos
  }).fields(multerFields);
};
