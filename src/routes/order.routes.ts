import express from "express";
import authenticateToken from "../middleware/auth.middleware";
import { orderController } from "../controllers";

const router = express.Router();

router.use(authenticateToken);
router.post("/", orderController.createOrder);
router.get("/", orderController.getOrders);
router.put("/complete/:orderId", orderController.completeOrder);
router.get("/:orderId", orderController.getOrderById);

export default router;
