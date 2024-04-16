import express from "express";
import {
  getUserStats,
  getUserStat,
  updateUserStat
} from "../../controllers/userStats.js";

const router = express.Router();

router.get("/", getUserStats);
router.get("/:id", getUserStat);
router.put("/:id", updateUserStat);

export default router;