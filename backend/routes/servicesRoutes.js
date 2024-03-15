import express from "express";
import serviceController from "../controllers/servicesController.js";

const router = express.Router();

router.post("/", serviceController.createService);

router.get("/", serviceController.getAllServices);

router.get("/:id", serviceController.getServiceById);

router.delete("/:id", serviceController.deleteServiceById);

router.get('/getUserSpecificService/:userId', serviceController.getUserSpecificService);

export default router;
