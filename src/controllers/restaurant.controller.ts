import { NextFunction, Request, Response } from "express";
import { restaurantService } from "../service";
import { validateRequest } from "./ajv-schema";
import { restaurantBodyInterfaceSchema } from "./ajv-schema/schema";
import { validate } from "uuid";

export const createRestaurant = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    validateRequest(
      req.body,
      restaurantBodyInterfaceSchema,
      "Restaurant fields are missing. Please try again",
      400
    );
    const newRestaurant = await restaurantService.createRestaurant(req.body);
    res.status(201).json({
      data: newRestaurant,
      message: "Restaurant create successful",
      error: null,
      code: 201,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllRestaurants = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const restaurants = await restaurantService.getAllRestaurants();
    res.status(200).json({
      data: restaurants,
      message: "Restaurants fetch successful",
      error: null,
      code: 200,
    });
  } catch (error) {
    next(error);
  }
};

export const getRestaurantById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { restaurantId } = req.params;

  try {
    const restaurant = await restaurantService.getRestaurantById(restaurantId);
    res.status(200).json({
      data: restaurant,
      message: "Restaurant fetch successful",
      error: null,
      code: 200,
    });
  } catch (error) {
    next(error);
  }
};

export const updateRestaurant = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { restaurantId } = req.params;
  try {
    validateRequest(
      req.body,
      restaurantBodyInterfaceSchema,
      "Restaurant fields are missing. Please try again",
      400
    );
    const {
      name,
      notes,
      location,
      photo,
      distance,
      openTime,
      deliveryFee,
      minimumAmount,
    } = req.body;

    const updatedRestaurant = await restaurantService.updateRestaurant(
      restaurantId,
      name,
      notes,
      location,
      photo,
      distance,
      openTime,
      deliveryFee,
      minimumAmount
    );

    res.status(204).json({
      data: updatedRestaurant,
      message: "Restaurant fetch successful",
      error: null,
      code: 204,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteRestaurant = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { restaurantId } = req.params;

  try {
    await restaurantService.deleteRestaurant(restaurantId);
    res.status(204).json({
      data: null,
      message: "Restaurant delete successful",
      error: null,
      code: 204,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  createRestaurant,
  getAllRestaurants,
  getRestaurantById,
  updateRestaurant,
  deleteRestaurant,
};
