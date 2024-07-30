import express from "express";
const router = express.Router();
import { upload, video } from "../../configs/multerConfig.js";
import {
    getAllmega_menu,
    createmega_menus,
    getmega_menusById,
    updatemega_menus,
    deletemega_menus,
    getAllmega_menu_categories,
    creatmega_menu_categories,
    getmega_menu_categoriesById,
    updatemega_menu_categories,
    deletemega_menu_categories,
    getAllfooter_menus,
    creatfooter_menus,
    getfooter_menusById,
    updatefooter_menus,
    deletefooter_menus,
    mega_menu_categories_frontSide,creatfeatured_services
    ,updatefeatured_services
    ,deletefeatured_services,getAllfeatured_services,
    getfeatured_servicesById, getAllupcoming_events,
    creatupcoming_events,
    getupcoming_eventsById,
    updateupcoming_events,
    deleteupcoming_events,
    } from "../../controllers/frontEndController.js"


    router.get("/getAllmega_menu", getAllmega_menu);
router.post(
 "/createmega_menus",
  createmega_menus
);
router.get("/getmega_menusById/:id", getmega_menusById);
router.put(
  "/updatemega_menus/:id",
  
  updatemega_menus
);
router.delete(
  "/deletemega_menus/:id",
 
  deletemega_menus
);

// Routes for mega_menu_categories
router.get("/mega_menu_categories_frontSide", mega_menu_categories_frontSide);
router.get("/getAllmega_menu_categories", getAllmega_menu_categories);
router.post(
  "/creatmega_menu_categories",

  creatmega_menu_categories
);
router.get("/getmega_menu_categoriesById/:id", getmega_menu_categoriesById);
router.put(
  "/updatemega_menu_categories/:id",

  updatemega_menu_categories
);
router.delete(
  "/deletemega_menu_categories/:id",
 
  deletemega_menu_categories
);

// Routes for footer_menus
router.get("/getAllfooter_menus", getAllfooter_menus);
router.post(
  "/creatfooter_menus",

  creatfooter_menus
);
router.get("/getfooter_menusById/:id", getfooter_menusById);
router.put(
  "/updatefooter_menus/:id",
 
  updatefooter_menus
);
router.delete(
  "/deletefooter_menus/:id",
 
  deletefooter_menus
);


router.get("/getAllfeatured_services", getAllfeatured_services);
router.post(
  "/creatfeatured_services",
  upload([
    {
      name: "image",
      path: "public/uploads/adminImg",
    },
  ]),

  creatfeatured_services
);
router.get("/getfeatured_servicesById/:id", getfeatured_servicesById);
router.put(
  "/updatefeatured_services/:id",
  upload([
    {
      name: "image",
      path: "public/uploads/adminImg",
    },
  ]),

  updatefeatured_services
);
router.delete(
  "/deletefeatured_services/:id",
 
  deletefeatured_services
);

// Routes for upcoming_events
router.get("/getAllupcoming_events", getAllupcoming_events);
router.post(
  "/creatupcoming_events",
  upload([
    {
      name: "image",
      path: "public/uploads/adminImg",
    },
  ]),
  
  creatupcoming_events
);
router.get("/getupcoming_eventsById/:id", getupcoming_eventsById);
router.put(
  "/updateupcoming_events/:id",
  upload([
    {
      name: "image",
      path: "public/uploads/adminImg",
    },
  ]),

  updateupcoming_events
);
router.delete(
  "/deleteupcoming_events/:id",

  deleteupcoming_events
);

export default router;
