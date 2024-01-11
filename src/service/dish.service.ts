import { Dish, Restaurant, DishCategory, DishRating } from "../model";

/*
@@@ Dish Service
*/

const createDish = async (dishData: any, categoryId: string): Promise<Dish> => {
  return await Dish.create({
    ...dishData,
    dishCategoryId: categoryId,
  });
};

const getDishById = async (id: string) => {
  return await Dish.findByPk(id, {
    include: [
      {
        model: DishRating,
        as: "ratings",
      },
    ],
  });
};

const updateDish = async (id: string, updatedData: any) => {
  return await Dish.update(updatedData, { where: { id } });
};

const deleteDish = async (id: string) => {
  return await Dish.destroy({ where: { id } });
};

const dishByRestaurant = async (
  id: string,
  sizePerPage: number,
  offset: number
) => {
  // const restaurant = await Restaurant.findByPk(id);
  const dishes = await Dish?.findAll({
    where: {
      restaurantId: id,
    },
    limit: sizePerPage,
    offset,
  });

  return dishes;
};

const getAllDishes = async () => {
  return await Dish.findAll();
};

export default {
  createDish,
  getDishById,
  updateDish,
  deleteDish,
  dishByRestaurant,
  getAllDishes,
};
