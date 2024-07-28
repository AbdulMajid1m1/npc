import express from "express";
const router = express.Router();

import userRoutes from "./subRoutes/usersRoutes.js";
import masterData from "./EissaRootRoute.js";
import cataloges from "./subRoutes/calatoge.js";
import blogRoutes from "./subRoutes/blogRoutes.js";
router.use("/master-data", masterData);
router.use("/users", userRoutes);
router.use("/", cataloges);

router.use("/blogs", blogRoutes);
export default router;
