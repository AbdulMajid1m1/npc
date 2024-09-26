import express, { Router } from "express";
import { upload } from "../configs/multerConfig.js";
const router = express.Router();
import {
  createunit,
  getAllunit,
  getunitById,
  updateunit,
  deleteunit,
  createdocument,
  getAllcr_documents,
  getcr_documentsById,
  updatecr_documents,
  deletecr_documents,
  createdocumentType,
  getAlldocumentType,
  getAlldocumentTypename,
  updatedocumentType,
  deletedocumentType,
  getdocumentTypeById,
  createotherproduct,
  getAllotherproduct,
  getotherproductById,
  updateotherproduct,
  deleteotherproduct,
  creategpctype,
  getAllgpctype,
  getgpctypeById,
  updategpctype,
  deletegpctype,
  createProductPackag,
  getAllproductPackagSchema,
  getproductPackagSchemaById,
  updateproductPackagSchema,
  deleteproductPackagSchema,
  createemailsetting,
  getAllemailsetting,
  getemailsettingById,
  updateemailsetting,
  deleteemailsetting,
  createcountryofsale,
  getAllcountryofsale,
  getcountryof_saleById,
  updatecountryofsale,
  deletecountryofsale,
  createHsCode,
  getAllHsCode,
  getHsCodeById,
  updateHsCode,
  deleteHsCode,
  createUNSPSC,
  getAllUNSPSC,
  getUNSPSCById,
  updateUNSPSC,
  deleteUNSPSC,
  getAllCountries,
  getAllCountriesName,
  createCountries,
  getCountriesById,
  updateCountries,
  deleteCountries,
  getAllStates,
  getAllStatesName,
  createStates,
  getStatesById,
  updateStates,
  deleteStates,
  getAllCities,
  createCities,
  getCitiesById,
  updateCities,
  deleteCities,
  translations,
  translations_table,
  translations_put,
  translations_post,
  addAdmin,
  updateAdmin,
  getAllAdmins,
  deleteAdmin,
  createRole,
  getRoles,
  updateRole,
  getRole,
  deleteRole,
  getNewsletterSubscriptions,
  sendNewsletter,
} from "../controllers/masterDataController.js";
import {createproductRequest,getAllProductRequests,getProductRequestsByNpcUserId,updateProductRequestStatus} from "../controllers/productRequestController.js"

//--------------------ProductRequest--------------------------------
router.post("/createproductRequest", createproductRequest)
router.get("/getAllProductRequests", getAllProductRequests)
router.get("/getProductRequestsByNpcUserId/:npc_user_id",getProductRequestsByNpcUserId)
router.put("/updateProductRequestStatus/:id", updateProductRequestStatus)
//--------------NewsletterSubscriptions----------------------------
router.post("/NewsletterSubscriptions", sendNewsletter);
router.get("/NewsletterSubscriptions", getNewsletterSubscriptions);
//----------------------------Roles------------------------
router.delete("/role/:id", deleteRole);
router.get("/role/:id", getRole);
router.put("/role/:id", updateRole);
router.get("/role", getRoles);
router.post("/role", createRole);
//--------------------------admin-------------------------------------
router.get("/admin", getAllAdmins);
router.delete("/admin/:adminId", deleteAdmin);
router.post(
  "/admin",
  upload([
    {
      name: "image",
      path: "public/uploads/documents/adminProfilePictures",
    },
  ]),
  addAdmin
);
router.put(
  "/admin/:adminId",
  upload([
    {
      name: "image",
      path: "public/uploads/documents/adminProfilePictures",
    },
  ]),
  updateAdmin
);
//----------------------------translate----------------------------------------------------
router.get("/translations", translations);
router.get("/translations_table", translations_table);
router.put("/translations_put/:id", translations_put);
router.post("/translations_post", translations_post);

//--------------------------------Cities--------------------------------

router.post("/createCities", createCities);
router.get("/getAllCities", getAllCities);
router.get("/getCitiesById/:id", getCitiesById);
router.put("/updateCities/:id", updateCities);
router.delete("/deleteCities/:id", deleteCities);

//----------------------------------state--------------------------------

router.post("/createStates", createStates);
router.get("/getAllStates", getAllStates);
router.get("/getAllStatesName", getAllStatesName);
router.get("/getStatesById/:id", getStatesById);
router.put("/updateStates/:id", updateStates);
router.delete("/deleteStates/:id", deleteStates);

//----------------------------------Country--------------------------------

router.post("/createCountries", createCountries);
router.get("/getAllCountries", getAllCountries);
router.get("/getAllCountriesName", getAllCountriesName);
router.get("/getCountriesById/:id", getCountriesById);
router.put("/updateCountries/:id", updateCountries);
router.delete("/deleteCountries/:id", deleteCountries);
//----------------------------------UNSPSC--------------------------------

router.post("/createUNSPSC", createUNSPSC);
router.get("/getAllUNSPSC", getAllUNSPSC);
router.get("/getUNSPSCById/:id", getUNSPSCById);
router.put("/updateUNSPSC/:id", updateUNSPSC);
router.delete("/deleteUNSPSC/:id", deleteUNSPSC);

//-----------------------------hscode-------------------------------------
router.post("/createHsCode", createHsCode);
router.get("/getAllHsCode", getAllHsCode);
router.get("/getHsCodeById/:id", getHsCodeById);
router.put("/updateHsCode/:id", updateHsCode);
router.delete("/deleteHsCode/:id", deleteHsCode);

//----------------------------------------------------------------countryofsale----------------

router.post("/createcountryofsale", createcountryofsale);
router.get("/getAllcountryofsale", getAllcountryofsale);
router.get("/getcountryof_saleById/:id", getcountryof_saleById);
router.put("/updatecountryofsale/:id", updatecountryofsale);
router.delete("/deletecountryofsale/:id", deletecountryofsale);

//--------------------------------createemailsetting------------------------------

router.post("/createemailsetting", createemailsetting);
router.get("/getAllemailsetting", getAllemailsetting);
router.get("/getemailsettingById/:id", getemailsettingById);
router.put("/updateemailsetting/:id", updateemailsetting);
router.delete("/deleteemailsetting/:id", deleteemailsetting);

//------------------------productpacakging----------------------------------

router.post("/createProductPackag", createProductPackag);
router.get("/getallproductPackagSchema", getAllproductPackagSchema);
router.get("/getproductPackagSchemabyid/:id", getproductPackagSchemaById);
router.put("/updateproductPackagSchema/:id", updateproductPackagSchema);
router.delete("/deleteproductPackagSchema/:id", deleteproductPackagSchema);

//------------------------------creategpctype------------------------------

router.post("/creategpctype", creategpctype);
router.get("/getallgpctype", getAllgpctype);
router.get("/getgpctypebyid/:id", getgpctypeById);
router.put("/updategpctype/:id", updategpctype);
router.delete("/deletegpctype/:id", deletegpctype);

//------------------------------Other_products----------------

router.post("/createotherproduct", createotherproduct);
router.get("/getallotherproduct", getAllotherproduct);
router.get("/getotherproductbyid/:id", getotherproductById);
router.put("/updateotherproduct/:id", updateotherproduct);
router.delete("/deleteotherproduct/:id", deleteotherproduct);

//------------------------------units
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
