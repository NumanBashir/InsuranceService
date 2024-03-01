import express from "express";
import usersController from "../controllers/usersController.js";

const router = express.Router();

router.post("/", usersController.createUser);

router.get("/", usersController.getAllUsers);

router.get("/:id", usersController.getUserById);

export default router;
