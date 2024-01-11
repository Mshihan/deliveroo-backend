import { dishCategoryController } from "../controllers";
import express from "express";
import authenticateToken from "../middleware/auth.middleware";

const router = express.Router();

router.get("/", dishCategoryController.getAllDishCategories);
router.get("/dishes", dishCategoryController.getAllDishCategoriesWithDishes);
router.get("/:id", dishCategoryController.getDishCategoryById);

// Restricted
router.use(authenticateToken);
router.post("/", dishCategoryController.createDishCategory);
router.put("/:id", dishCategoryController.updateDishCategory);
router.delete("/:id", dishCategoryController.deleteDishCategory);

export default router;
