import express from "express";
const router = express.Router();

import userRoutes from "./subRoutes/usersRoutes.js";
import masterData from "./EissaRootRoute.js";

router.use("/master-data", masterData);
router.use("/users", userRoutes);

export default router;
