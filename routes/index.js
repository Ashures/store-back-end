import express from "express";
import apiRoutes from "./api/index.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("root");
})
router.use("/api", apiRoutes);

export default router;