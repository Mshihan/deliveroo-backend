import { dishCategoryService } from "../service";
import { NextFunction, Request, Response } from "express";

const createDishCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newCategory = await dishCategoryService.createDishCategory(req.body);
    res.status(201).json({
      data: newCategory,
      message: "Dish category create successful",
      error: null,
      code: 201,
    });
  } catch (error) {
    next(error);
  }
};

const getDishCategoryById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const category = await dishCategoryService.getDishCategoryById(id);
    res.status(200).json({
      data: category,
      message: "Dish category fetch successful",
      error: null,
      code: 200,
    });
  } catch (error) {
    next(error);
  }
};

const getAllDishCategories = async (
  _: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categories = await dishCategoryService.getAllDishCategory();
    res.status(200).json({
      data: categories,
      message: "Dish categories fetch successful",
      error: null,
      code: 200,
    });
  } catch (error) {
    next(error);
  }
};

const getAllDishCategoriesWithDishes = async (
  _: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categories = await dishCategoryService.getAllDishCategoryWithDishes();
    res.status(200).json({
      data: categories,
      message: "Dish categories fetch successful",
      error: null,
      code: 200,
    });
  } catch (error) {
    next(error);
  }
};

const updateDishCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const updatedCategory = await dishCategoryService.updateDishCategory(
      id,
      req.body
    );
    res.status(204).json({
      data: updatedCategory,
      message: "Dish categories update successful",
      error: null,
      code: 204,
    });
  } catch (error) {
    next(error);
  }
};

const deleteDishCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    await dishCategoryService.deleteDishCategory(id);
    res.status(204).json({
      data: null,
      message: "Dish categories delete successful",
      error: null,
      code: 204,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  createDishCategory,
  getDishCategoryById,
  getAllDishCategories,
  updateDishCategory,
  deleteDishCategory,
  getAllDishCategoriesWithDishes,
};
