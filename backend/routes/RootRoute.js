import express from "express";
const router = express.Router();

import userRoutes from "./subRoutes/usersRoutes.js";
import masterData from "./EissaRootRoute.js";
import cataloges from "./subRoutes/calatoge.js"
router.use("/master-data", masterData);
router.use("/users", userRoutes);
router.use("/", cataloges);
export default router;
