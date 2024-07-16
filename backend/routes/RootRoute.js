import express from "express";
const router = express.Router();

import userRoutes from "./subRoutes/usersRoutes.js";


router.use("/users", userRoutes);

export default router;
