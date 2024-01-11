import { Request, Response } from "express";
import handleUnknownError from "../utils/error.utils";
import { categoryService } from "../service";

export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const categories = await categoryService.getAllCategories();
    res.json(categories);
  } catch (error) {
    handleUnknownError(error, res);
  }
};

export const getCategoryById = async (req: Request, res: Response) => {
  const categoryId = req.params.categoryId;
  try {
    const category = await categoryService.getCategoryById(categoryId);
    if (!category) {
      res.status(404).json({ message: "Category not found" });
    } else {
      res.json(category);
    }
  } catch (error) {
    handleUnknownError(error, res);
  }
};

export const createCategory = async (req: Request, res: Response) => {
  const { name } = req.body;
  try {
    const newCategory = await categoryService.createCategory(name);
    res.status(201).json(newCategory);
  } catch (error) {
    handleUnknownError(error, res);
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  const categoryId = req.params.categoryId;
  const { name } = req.body;
  try {
    const updatedCategory = await categoryService.updateCategory(
      categoryId,
      name
    );
    res.json(updatedCategory);
  } catch (error) {
    handleUnknownError(error, res);
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  const categoryId = req.params.categoryId;
  try {
    await categoryService.deleteCategory(categoryId);
    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    handleUnknownError(error, res);
  }
};

export default {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
