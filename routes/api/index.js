import express from "express";
import userRoutes from "./user.js";
import userStatRoutes from "./userStat.js";

const router = express.Router();

router.use("/users", userRoutes);
router.use("/userStats", userStatRoutes);

export default router;