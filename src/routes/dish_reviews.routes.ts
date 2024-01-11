import express from "express";
import { dishReviewController } from "../controllers";
import authenticateToken from "../middleware/auth.middleware";

const router = express.Router();

router.use(authenticateToken);
router.post("/", dishReviewController.createReview);
router.get("/:dishId", dishReviewController.getReviewsByDish);

export default router;
