import { Dish, DishCategory } from "../model";

const createDishCategory = async (categoryData: any) => {
  return await DishCategory.create(categoryData);
};

const getDishCategoryById = async (id: string) => {
  return await DishCategory.findByPk(id);
};

const getAllDishCategory = async () => {
  return await DishCategory.findAll();
};

const getAllDishCategoryWithDishes = async () => {
  return await DishCategory.findAll({
    include: [
      {
        model: Dish,
      },
    ],
  });
};

const updateDishCategory = async (id: string, updatedData: any) => {
  return await DishCategory.update(updatedData, { where: { id } });
};

const deleteDishCategory = async (id: string) => {
  return await DishCategory.destroy({ where: { id } });
};

export default {
  createDishCategory,
  getDishCategoryById,
  getAllDishCategory,
  updateDishCategory,
  deleteDishCategory,
  getAllDishCategoryWithDishes,
};
