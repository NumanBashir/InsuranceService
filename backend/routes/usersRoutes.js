import express from "express";
import usersController from "../controllers/usersController.js";

const router = express.Router();

router.post("/", usersController.createUser);

router.get("/", usersController.getAllUsers);

router.get("/search", usersController.searchUsersByName);

router.get("/:id", usersController.getUserById);

router.get("/email/:email", usersController.getUserByEmail);

router.get("/:userId/services", usersController.getServicesByUserId);

router.get("/:userId/insurances", usersController.getInsurancesByUserId);

router.delete(
  "/:userId/services/:serviceId",
  usersController.deleteServiceFromUser
);

export default router;
