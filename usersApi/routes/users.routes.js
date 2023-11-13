import express from "express";
import {
  getUsers,
  getUserById,
  getUserByUsername,
  updateUser,
  loginUser,
  registerUser,
  authUser
} from "../controllers/users.controller.js";
const router = express.Router();

router.get("/", getUsers);
router.get("/:username", getUserByUsername);
router.get("/id/:id", getUserById);
router.put("/:id", updateUser);
router.post("/login", loginUser);
router.post("/", registerUser);
router.get("/auth/:username", authUser);

export default router;
