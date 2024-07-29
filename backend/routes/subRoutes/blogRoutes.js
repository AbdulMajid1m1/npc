import express from "express";
import { upload } from "../../configs/multerConfig.js";
import {
  createPage,
  deletePage,
  getNewPages,
  getPage,
  getTemplates,
  updatePage,
} from "../../controllers/blogsController.js";
import { adminAuth, generalAuth } from "../../middlewares/auth.js";

const templateUploadConfigs = {
  template1: [
    { name: "hero_background", path: "public/uploads/Images/blogImages" },
    { name: "section_2_image", path: "public/uploads/Images/blogImages" },
    { name: "section_3_image", path: "public/uploads/Images/blogImages" },
    // Add more fields as needed
  ],
  template2: [
    { name: "hero_background", path: "public/uploads/Images/blogImages" },
    { name: "section_2_image", path: "public/uploads/Images/blogImages" },
    { name: "section_3_image", path: "public/uploads/Images/blogImages" },

    // Add more fields as needed
  ],
  template3: [
    { name: "hero_background", path: "public/uploads/Images/blogImages" },
    { name: "section_2_image", path: "public/uploads/Images/blogImages" },
    { name: "section_3_image", path: "public/uploads/Images/blogImages" },
  ],
  template4: [
    { name: "hero_background", path: "public/uploads/Images/blogImages" },
    { name: "section_2_image", path: "public/uploads/Images/blogImages" },
    { name: "section_3_image", path: "public/uploads/Images/blogImages" },
  ],
  template5: [
    { name: "hero_background", path: "public/uploads/Images/blogImages" },
    { name: "section_image", path: "public/uploads/Images/blogImages" },
    { name: "section_3_image", path: "public/uploads/Images/blogImages" },
  ],
  template6: [
    { name: "hero_background", path: "public/uploads/Images/blogImages" },
    { name: "section_image", path: "public/uploads/Images/blogImages" },
    { name: "section_3_image", path: "public/uploads/Images/blogImages" },
  ],
  template7: [
    { name: "carousel_images_0", path: "public/uploads/Images/blogImages" },
    { name: "carousel_images_1", path: "public/uploads/Images/blogImages" },
    { name: "carousel_images_2", path: "public/uploads/Images/blogImages" },
    { name: "carousel_images_3", path: "public/uploads/Images/blogImages" },
    { name: "carousel_images_4", path: "public/uploads/Images/blogImages" },
    { name: "section_image", path: "public/uploads/Images/blogImages" },
    { name: "section_3_image", path: "public/uploads/Images/blogImages" },
  ],
  cv_template: [
    { name: "profile_image", path: "public/uploads/Images/blogImages" },
  ],
};

const determineUploadFields = (req, res, next) => {
  console.log(req.query.template_name);
  const { template_name } = req.query;

  if (!template_name) {
    return res.status(400).json({ error: "Template name is required" });
  }

  const uploadFields = templateUploadConfigs[template_name];

  if (!uploadFields) {
    return res.status(400).json({ error: "Invalid template name" });
  }

  req.uploadFields = uploadFields;
  next();
};

// Dynamic upload middleware
const dynamicUpload = (req, res, next) => {
  const uploadFields = req.uploadFields;
  const multerUpload = upload(uploadFields);

  multerUpload(req, res, function (err) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    next();
  });
};

const router = express.Router();

router.post(
  "/",

  determineUploadFields, // Determine template type and upload fields
  dynamicUpload, // Dynamic upload based on template type
  createPage
);

router.put(
  "/",

  determineUploadFields, // Determine template type and upload fields
  dynamicUpload, // Dynamic upload based on template type
  updatePage
);

router.get("/", getPage);

router.get("/pages", getNewPages);

router.get("/template", getTemplates);

router.delete("/:id", deletePage);

export default router;
