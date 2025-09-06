import express from "express";
const router = express.Router();
import { protectRoute } from "../middlewares/auth.middleware.js";
import { getUsers,getMessages,sendMessage } from "../controllers/message.controller.js";

router.get("/users", protectRoute, getUsers);
router.post("/send/:id",protectRoute,sendMessage);
router.get("/:id",protectRoute,getMessages);

export default router;