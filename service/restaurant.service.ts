// restaurantService.ts

import { Restaurant, Category } from "../model";
import { sequelize } from "../database/database";
import { RestaurantCategory } from "../model/resturent.model";

const createRestaurant = async (
  name: string,
  notes: string | null,
  location: string,
  photo: string | null,
  categoryIds: string[]
) => {
  let transaction;
  try {
    transaction = await sequelize.transaction();

    let categories: Category[] = [];

    if (categoryIds && categoryIds.length > 0) {
      categories = await Category.findAll({
        where: {
          id: categoryIds,
        },
        transaction,
      });
    }

    const newRestaurant = await Restaurant.create({
      name,
      notes,
      location,
      photo,
    });

    await newRestaurant.addCategories(categories);
    await transaction.commit();
    return newRestaurant;
  } catch (error) {
    console.log(error);
    if (transaction) {
      await transaction.rollback();
    }
    throw new Error("Could not create a new restaurant with categories");
  }
};

const getAllRestaurants = async () => {
  try {
    const restaurants = await Restaurant.findAll({
      include: [
        {
          model: Category,
        },
      ],
    });
    return restaurants;
  } catch (error) {
    throw new Error("Could not fetch restaurants");
  }
};

const getRestaurantById = async (id: string) => {
  try {
    const restaurant = await Restaurant.findByPk(id, {
      include: { model: Category },
    });
    if (!restaurant) {
      throw new Error("Restaurant not found");
    }
    return restaurant;
  } catch (error) {
    throw new Error("Could not fetch restaurant");
  }
};

const updateRestaurant = async (
  id: string,
  name: string,
  notes: string | null,
  location: string,
  photo: string | null,
  categoryIds: string | null
) => {
  try {
    const restaurant = await Restaurant.findByPk(id, {
      include: { model: Category },
    });
    if (!restaurant) {
      throw new Error("Restaurant not found");
    }

    await restaurant.update({ name, notes, location, photo });

    let categories: Category[] = [];

    if (categoryIds && categoryIds.length > 0) {
      categories = await Category.findAll({
        where: {
          id: categoryIds,
        },
      });
    }

    await restaurant.setCategories(categories);

    return restaurant;
  } catch (error) {
    throw new Error("Could not update restaurant");
  }
};

const deleteRestaurant = async (id: string) => {
  try {
    const restaurant = await Restaurant.findByPk(id, {
      include: { model: Category },
    });
    if (!restaurant) {
      throw new Error("Restaurant not found");
    }
    await restaurant.destroy();
  } catch (error) {
    throw new Error("Could not delete restaurant");
  }
};

export default {
  createRestaurant,
  getAllRestaurants,
  getRestaurantById,
  updateRestaurant,
  deleteRestaurant,
};
