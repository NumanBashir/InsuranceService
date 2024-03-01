import express from "express";
import ordersController from "../controllers/ordersController.js";

const router = express.Router();

router.post("/", ordersController.createOrder);

router.get("/", ordersController.getAllOrders);

router.get("/:id", ordersController.getOrderById);

router.delete("/:id", ordersController.deleteOrderById);

export default router;
