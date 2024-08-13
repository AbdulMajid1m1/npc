import express from "express";
import {
  createProductStorage,
  updateProductStorage,
  getProductStorage,
  deleteProductStorage,
  createProductContent,
  updateProductContent,
  getProductContents,
  deleteProductContent,
  createNutritionalInfo,
  updateNutritionalInfo,
  getNutritionalInfo,
  deleteNutritionalInfo,
  createAllergen,
  updateAllergen,
  getAllergens,
  deleteAllergen,
  createProductQualityMark,
  updateProductQualityMark,
  getProductQualityMarks,
  deleteProductQualityMark,
  createEfficiencyLabel,
  updateEfficiencyLabel,
  getEfficiencyLabels,
  deleteEfficiencyLabel,
  createProductConformity,
  updateProductConformity,
  getProductConformities,
  deleteProductConformity,
  createIeceeCertificate,
  updateIeceeCertificate,
  getIeceeCertificates,
  deleteIeceeCertificate,
  createFoodProductSafety,
  updateFoodProductSafety,
  getFoodProductSafeties,
  deleteFoodProductSafety,
  createPackaging,
  updatePackaging,
  getPackagings,
  deletePackaging,
  getComplianceAndDqmsStatus,
} from "../../controllers/digitalLinksController.js";
import { multipleUpload } from "../../configs/multerConfig.js";

const router = express.Router();

router.get("/getComplianceAndDqmsStatus", getComplianceAndDqmsStatus);



router.post(
  "/productStorage",
  multipleUpload("images", 5, "public/uploads/images"),
  createProductStorage
);
router.get("/productStorage", getProductStorage);
router.put("/productStorage/:id", updateProductStorage);
router.delete("/productStorage/:id", deleteProductStorage);

// productContent routes

router.post(
  "/productContents",
  multipleUpload("images", 5, "public/uploads/images"),
  createProductContent
);
router.get("/productContents", getProductContents);
router.put("/productContents/:id", updateProductContent);
router.delete("/productContents/:id", deleteProductContent);

//  Nutritional Info routes
router.post("/nutritionalInfo", createNutritionalInfo);
router.put("/nutritionalInfo/:id", updateNutritionalInfo);
router.get("/nutritionalInfo", getNutritionalInfo);
router.delete("/nutritionalInfo/:id", deleteNutritionalInfo);

//  Allergen routes
router.post("/allergens", createAllergen);
router.put("/allergens/:id", updateAllergen);
router.get("/allergens", getAllergens);
router.delete("/allergens/:id", deleteAllergen);

// Product Quality Mark routes

router.post(
  "/qualityMarks",
  multipleUpload("images", 5, "public/uploads/images"),
  createProductQualityMark
);
router.put("/qualityMarks/:id", updateProductQualityMark);
router.get("/qualityMarks", getProductQualityMarks);
router.delete("/qualityMarks/:id", deleteProductQualityMark);

// Efficiency Label routes
router.post(
  "/efficiencyLabels",
  multipleUpload("images", 5, "public/uploads/images"),
  createEfficiencyLabel
);
router.put("/efficiencyLabels/:id", updateEfficiencyLabel);
router.get("/efficiencyLabels", getEfficiencyLabels);
router.delete("/efficiencyLabels/:id", deleteEfficiencyLabel);

// Product Conformity routes
router.post(
  "/productConformity",
  multipleUpload("images", 5, "public/uploads/images"),
  createProductConformity
);

router.put("/productConformity/:id", updateProductConformity);
router.get("/productConformity", getProductConformities);
router.delete("/productConformity/:id", deleteProductConformity);

// Iecee Certificate routes
router.post(
  "/ieceeCertificates",
  multipleUpload("images", 5, "public/uploads/images"),
  createIeceeCertificate
);
router.put("/ieceeCertificates/:id", updateIeceeCertificate);
router.get("/ieceeCertificates", getIeceeCertificates);
router.delete("/ieceeCertificates/:id", deleteIeceeCertificate);

// foodProductSafety routes

router.post(
  "/foodProductSafeties",
  multipleUpload("images", 5, "public/uploads/images"),
  createFoodProductSafety
);
router.get("/foodProductSafeties", getFoodProductSafeties);
router.put("/foodProductSafeties/:id", updateFoodProductSafety);
router.delete("/foodProductSafeties/:id", deleteFoodProductSafety);

// packaging routes
router.post(
  "/packagings",
  multipleUpload("images", 5, "public/uploads/images"),
  createPackaging
);
router.get("/packagings", getPackagings);
router.put("/packagings/:id", updatePackaging);
router.delete("/packagings/:id", deletePackaging);

export default router;
