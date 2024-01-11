import express from "express";
import { dishController } from "../controllers";
import authenticateToken from "../middleware/auth.middleware";

const router = express.Router();

router.get("/all-dishes", dishController.getAllDishes);
router.get(
  "/all-dishes/:restaurantId",
  dishController.getAllDishesFromRestaurant
);
router.get("/:id", dishController.getDishById);

// Restricted
router.use(authenticateToken);
router.post("/", dishController.createDish);
router.patch("/:id", dishController.updateDish);
router.delete("/:id", dishController.deleteDish);

export default router;
