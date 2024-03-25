import express from "express";
import {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser
} from "../../controllers/user.js";

const router = express.Router();

router.post("/", createUser);
router.get("/", getUsers);
router.get("/:name", getUser);
router.put("/:name", updateUser);
router.delete("/:name", deleteUser);

export default router;