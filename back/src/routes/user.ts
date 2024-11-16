import { Router } from "express";
import {
  changePassword,
  createUser,
  loginUser,
  updateUser,
  verifyUser,
} from "../controllers/user";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.post("/api/v01/register", createUser);
router.post("/api/v01/verifyUser", verifyUser);
router.post("/api/v01/login", loginUser);
router.put("/api/v01/loginUpdate", authMiddleware, updateUser);

router.put("/api/v01/putPass", authMiddleware, changePassword);

export default router;
