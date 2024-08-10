import express from "express";
import {
  registerNpcUser,
  updateNpcUser,
  getNpcUsers,
  deleteNpcUser,
  loginNpcUser,
} from "../../controllers/npcUserControllers.js";
import { upload } from "../../configs/multerConfig.js";

const router = express.Router();

router.post(
  "/register",
  upload([
    {
      name: "profilePicture",
      path: "public/uploads/Images/npcProfilePictures",
    },
  ]),
  registerNpcUser
);
router.put(
  "/updateUser/:userId",
  upload([
    {
      name: "profilePicture",
      path: "public/uploads/Images/npcProfilePictures",
    },
  ]),
  updateNpcUser
);

router.post("/login", loginNpcUser);
router.get("/:userId", getNpcUsers);
router.delete("/:userId", deleteNpcUser);

export default router;
