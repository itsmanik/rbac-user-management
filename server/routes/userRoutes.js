import express from "express";
import { createUser, deleteUser, updateUser, getUsers } from "../controllers/userController.js";
import protect from "../middlewares/authMiddleware.js";
import allowRoles from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.get("/", protect, allowRoles("admin"), getUsers);
router.post("/", protect, allowRoles("admin"), createUser);
router.put("/:id", protect, allowRoles("admin"), updateUser);
router.delete("/:id", protect, allowRoles("admin"), deleteUser);

export default router;
