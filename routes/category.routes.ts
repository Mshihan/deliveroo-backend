import express from "express";
import authenticateToken from "../middleware/auth.middleware";
import { categoryController } from "../controllers";

const router = express.Router();

router.use(authenticateToken);

// Get all categories
router.get("/", categoryController.getAllCategories);

// Get a single category
router.get("/:categoryId", categoryController.getCategoryById);

// Create a category
router.post("/", categoryController.createCategory);

// Update a category
router.put("/:categoryId", categoryController.updateCategory);

// Delete a category
router.delete("/:categoryId", categoryController.deleteCategory);

export default router;
