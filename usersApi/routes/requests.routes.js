import express from "express";
import {
  getRequestById,
  createRequest,
  getRequests,
  registerRequest,
} from "../controllers/requests.controller.js";
const router = express.Router();

// router.get("/", getRequests)
router.get("/:id", getRequestById);
router.post("/", createRequest);
router.post("/register", registerRequest);

// router.get("/", getUsers);
// router.get("/:username", getUserByUsername);
// router.put("/:id", updateUser);
// router.post("/login", loginUser);
// router.post("/", registerUser);
// router.get("/auth/:username", authUser);

export default router;
