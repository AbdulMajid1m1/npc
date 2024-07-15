// Assuming you have a userRouter.js or similar
import express from "express";
import { npcLogin, verifyGln } from "../../controllers/usersControllers.js";
// import { getMemberHistoryLogs } from '../../controllers/historylogsController.js'

const router = express.Router();

// Add a route for member history logs
router.post("/login", npcLogin);

router.post("/verifyGln", verifyGln);

export default router;
