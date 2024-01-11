import express from "express";
import authenticateToken from "../middleware/auth.middleware";
import restaurantController from "../controllers/restaurant.controller";

const router = express.Router();

router.get("/", restaurantController.getAllRestaurants);
router.get("/:restaurantId", restaurantController.getRestaurantById);

// Restricted
router.use(authenticateToken);
router.post("/create-restaurant", restaurantController.createRestaurant);
router.patch("/:restaurantId", restaurantController.updateRestaurant);
router.delete("/:restaurantId", restaurantController.deleteRestaurant);

export default router;
