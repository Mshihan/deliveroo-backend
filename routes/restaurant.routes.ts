import express from "express";
import authenticateToken from "../middleware/auth.middleware";
import restaurantController from "../controllers/restaurant.controller";

const router = express.Router();

router.use(authenticateToken);

// Create restaurant
router.post("/create-restaurant", restaurantController.createRestaurant);

// Get all restaurant
router.get("/", restaurantController.getAllRestaurants);

// Get a single restaurant
router.get("/:restaurantId", restaurantController.getRestaurantById);

// Update a restaurant
router.patch("/:restaurantId", restaurantController.updateRestaurant);

// Delete a restaurant
router.delete("/:restaurantId", restaurantController.deleteRestaurant);

export default router;
