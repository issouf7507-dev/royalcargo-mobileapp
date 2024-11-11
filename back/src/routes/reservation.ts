import { Router } from "express";

import {
  createReservation,
  getReservationById,
  getReservationById2,
} from "../controllers/reservation";

const router = Router();

router.post("/api/v01/reservation", createReservation);
router.get("/api/v01/reservation/:id", getReservationById);
router.get("/api/v01/reservation2/:id", getReservationById2);
export default router;
