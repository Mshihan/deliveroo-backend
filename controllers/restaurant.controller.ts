import { Request, Response } from "express";
import { restaurantService } from "../service";
import handleUnknownError from "../utils/error.utils";

export const createRestaurant = async (req: Request, res: Response) => {
  const { name, notes, location, photo, categoryIds } = req.body;

  try {
    const newRestaurant = await restaurantService.createRestaurant(
      name,
      notes,
      location,
      photo,
      categoryIds
    );
    res.status(201).json(newRestaurant);
  } catch (error) {
    handleUnknownError(error, res);
  }
};

export const getAllRestaurants = async (req: Request, res: Response) => {
  try {
    const restaurants = await restaurantService.getAllRestaurants();
    res.json(restaurants);
  } catch (error) {
    handleUnknownError(error, res);
  }
};

export const getRestaurantById = async (req: Request, res: Response) => {
  const { restaurantId } = req.params;

  try {
    const restaurant = await restaurantService.getRestaurantById(restaurantId);
    res.json(restaurant);
  } catch (error) {
    handleUnknownError(error, res);
  }
};

export const updateRestaurant = async (req: Request, res: Response) => {
  const { restaurantId } = req.params;
  const { name, notes, location, photo, categoryIds } = req.body;

  try {
    const updatedRestaurant = await restaurantService.updateRestaurant(
      restaurantId,
      name,
      notes,
      location,
      photo,
      categoryIds
    );

    res.json(updatedRestaurant);
  } catch (error) {
    handleUnknownError(error, res);
  }
};

export const deleteRestaurant = async (req: Request, res: Response) => {
  const { restaurantId } = req.params;

  try {
    await restaurantService.deleteRestaurant(restaurantId);
    res.json({ message: "Restaurant deleted successfully" });
  } catch (error) {
    handleUnknownError(error, res);
  }
};

export default {
  createRestaurant,
  getAllRestaurants,
  getRestaurantById,
  updateRestaurant,
  deleteRestaurant,
};
