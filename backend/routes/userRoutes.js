import express from "express";
import userController from "../controllers/usersController.js";

const router = express.Router();

router.post("/", userController.createUser);

router.get("/", userController.getAllUsers);

router.get("/:id", userController.getUserById);

export default router;
