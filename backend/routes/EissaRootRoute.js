import express, { Router } from "express";

const router = express.Router();
import { createunit, getAllunit, getunitById, updateunit, deleteunit,
    createdocument,getAllcr_documents,getcr_documentsById,updatecr_documents,deletecr_documents,
    createdocumentType,getAlldocumentType,getAlldocumentTypename,updatedocumentType,deletedocumentType,getdocumentTypeById

} from "../controllers/masterDataController.js";



router.post("/createunit", createunit);
router.get("/getallunit", getAllunit);
router.get("/getunitbyid/:id", getunitById);
router.put("/updateunit/:id", updateunit);
router.delete("/deleteunit/:id", deleteunit);
//cr_documentsController----------------------------------------------------------------

router.post("/createdocument", createdocument);
router.get("/getallcr_documents", getAllcr_documents);
router.get("/getcr_documentbyid/:id", getcr_documentsById);
router.put("/updatecr_documents/:id", updatecr_documents);
router.delete("/deletecr_documents/:id", deletecr_documents);
//documenttype----------------------------------------------------------------
router.post("/createdocumenttype", createdocumentType);
router.get("/getalldocumenttype", getAlldocumentType);
router.get("/getalldocumenttypename", getAlldocumentTypename);
router.put("/updatedocumenttype/:id", updatedocumentType);
router.delete("/deletedocumenttype/:id", deletedocumentType);
router.get("/getdocumenttypebyid/:id", getdocumentTypeById);

export default router;
