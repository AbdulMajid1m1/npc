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
} from "../../controllers/digitalLinksController.js";

const router = express.Router();

router.post("/productStorage", createProductStorage);
router.put("/productStorage/:id", updateProductStorage);
router.get("/productStorage", getProductStorage);
router.delete("/productStorage/:id", deleteProductStorage);

// productContent routes
router.post("/productContents", createProductContent);
router.put("/productContents/:id", updateProductContent);
router.get("/productContents", getProductContents);
router.delete("/productContents/:id", deleteProductContent);

//  Nutritional Info routes
router.post("/nutritionalInfo", createNutritionalInfo);
router.put("/nutritionalInfo/:id", updateNutritionalInfo);
router.get("/nutritionalInfo", getNutritionalInfo);
router.delete("/nutritionalInfo/:id", deleteNutritionalInfo);

export default router;
