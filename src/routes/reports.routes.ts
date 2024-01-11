import express from "express";
import authenticateToken from "../middleware/auth.middleware";
import { reportController } from "../controllers";

const router = express.Router();

router.use(authenticateToken);
router.get("/orders", reportController.getOrders);
router.get("/top-selling-items", reportController.getTopSellingItems);
router.get("/average-order-value", reportController.getAverageOrderValue);

export default router;
