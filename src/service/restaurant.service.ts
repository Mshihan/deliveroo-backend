import { sequelize } from "../database/database";
import { CustomError } from "../middleware/error.middleware";
import { Dish, DishCategory, Restaurant } from "../model";

const createRestaurant = async (data: any) => {
  let transaction;
  try {
    transaction = await sequelize.transaction();

    const newRestaurant = await Restaurant.create(data);

    await transaction.commit();
    return newRestaurant;
  } catch (error) {
    console.log(error);
    if (transaction) {
      await transaction.rollback();
    }
    throw new CustomError("Restaurant create failed", 400);
  }
};

const getAllRestaurants = async () => {
  try {
    const restaurants = await Restaurant.findAll({
      include: [
        {
          model: DishCategory,
          as: "categories",
          include: [
            {
              model: Dish,
              as: "dishes",
            },
          ],
        },
      ],
    });
    return restaurants;
  } catch (error) {
    throw new CustomError("Restaurant fetch failed", 400);
  }
};

const getRestaurantById = async (id: string) => {
  try {
    const restaurant = await Restaurant.findByPk(id);
    if (!restaurant) {
      throw new CustomError("Restaurant not found", 404);
    }
    return restaurant;
  } catch (error) {
    throw new CustomError("Restaurant fetch failed", 400);
  }
};

const updateRestaurant = async (
  id: string,
  name: string,
  notes: string | null,
  location: string,
  photo: string | null,
  distance: string | null,
  openTime: string | null,
  deliveryFee: string | null,
  minimumAmount: string | null
) => {
  try {
    const restaurant = await Restaurant.findByPk(id);
    if (!restaurant) {
      throw new CustomError("Restaurant not found", 404);
    }

    await restaurant.update({
      name,
      notes,
      location,
      photo,
      distance,
      openTime,
      deliveryFee,
      minimumAmount,
    });

    return restaurant;
  } catch (error) {
    throw new CustomError("Restaurant update failed", 400);
  }
};

const deleteRestaurant = async (id: string) => {
  try {
    const restaurant = await Restaurant.findByPk(id);
    if (!restaurant) {
      throw new CustomError("Restaurant not found", 404);
    }
    await restaurant.destroy();
  } catch (error) {
    console.log(error);
    throw new CustomError("Restaurant delete failed", 400);
  }
};

export default {
  createRestaurant,
  getAllRestaurants,
  getRestaurantById,
  updateRestaurant,
  deleteRestaurant,
};
