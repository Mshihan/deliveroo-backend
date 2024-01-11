import { NextFunction, Request, Response } from "express";
import { dishService } from "../service";

const createDish = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Assuming Plate will be assign to one category
    const { categoryId, ...dishData } = req.body;
    const newDish = await dishService.createDish(dishData, categoryId);
    res.status(201).json({
      data: newDish,
      message: "Dish create successful",
      error: null,
      code: 201,
    });
  } catch (error) {
    next(error);
  }
};

const getDishById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const dish = await dishService.getDishById(id);
    res.status(200).json({
      data: dish,
      message: "Dish fetch successful",
      error: null,
      code: 200,
    });
  } catch (error) {
    next(error);
  }
};

const updateDish = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const updatedDish = await dishService.updateDish(id, req.body);
    res.status(204).json({
      data: updatedDish,
      message: "Dish update successful",
      error: null,
      code: 204,
    });
  } catch (error) {
    next(error);
  }
};

const deleteDish = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    await dishService.deleteDish(id);
    res.status(204).json({
      data: null,
      message: "Dish delete successful",
      error: null,
      code: 204,
    });
  } catch (error) {
    next(error);
  }
};

const getAllDishesFromRestaurant = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { restaurantId } = req.params;
    const { page = "1", pageSize = "10" } = req.query;

    const pageNumber = parseInt(page as string, 10);
    const sizePerPage = parseInt(pageSize as string, 10);

    const offset = (pageNumber - 1) * sizePerPage;

    const dishesList = await dishService.dishByRestaurant(
      restaurantId,
      sizePerPage,
      offset
    );
    res.status(200).json({
      data: dishesList,
      message: "Dishes fetch successful",
      error: null,
      code: 200,
    });
  } catch (error) {
    next(error);
  }
};

const getAllDishes = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const dishesList = await dishService.getAllDishes();
    res.status(200).json({
      data: dishesList,
      message: "Dishes fetch successful",
      error: null,
      code: 200,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  createDish,
  getDishById,
  updateDish,
  deleteDish,
  getAllDishesFromRestaurant,
  getAllDishes,
};
