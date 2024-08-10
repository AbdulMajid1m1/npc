import express from "express";
import {
  createProductStorage,
  updateProductStorage,
  getProductStorage,
  deleteProductStorage,
} from "../../controllers/digitalLinksController.js";

const router = express.Router();

router.post("/productStorage", createProductStorage);
router.put("/productStorage/:id", updateProductStorage);
router.get("/productStorage", getProductStorage);
router.delete("/productStorage/:id", deleteProductStorage);

export default router;
