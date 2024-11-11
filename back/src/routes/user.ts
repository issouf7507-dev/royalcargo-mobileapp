import { Router } from "express";
import {
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

export default router;
