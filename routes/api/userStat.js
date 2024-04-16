import express from "express";
import {
  getUserStats,
  getUserStat,
  updateUserStat
} from "../../controllers/userStats.js";

const router = express.Router();

router.get("/", getUserStats);
router.get("/:name", getUserStat);
router.put("/:name", updateUserStat);

export default router;