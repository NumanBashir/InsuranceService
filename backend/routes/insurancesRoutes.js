import express from "express";
import insuranceController from "../controllers/insurancesController.js";

const router = express.Router();

router.post("/", insuranceController.createInsurance);

router.get("/", insuranceController.getAllInsurances);

router.get("/:id", insuranceController.getInsuranceById);

export default router;
