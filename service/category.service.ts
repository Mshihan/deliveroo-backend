import { Category } from "../model";

const getAllCategories = async () => {
  try {
    return await Category.findAll();
  } catch (error) {
    throw new Error("Error fetching categories");
  }
};

const getCategoryById = async (categoryId: string) => {
  try {
    return await Category.findByPk(categoryId);
  } catch (error) {
    throw new Error("Error fetching category");
  }
};

const createCategory = async (name: string) => {
  try {
    return await Category.create({ name });
  } catch (error) {
    throw new Error("Error creating category");
  }
};

const updateCategory = async (categoryId: string, name: string) => {
  try {
    const category = await Category.findByPk(categoryId);
    if (!category) {
      throw new Error("Category not found");
    }
    return await category.update({ name });
  } catch (error) {
    throw new Error("Error updating category");
  }
};

const deleteCategory = async (categoryId: string) => {
  try {
    const category = await Category.findByPk(categoryId);
    if (!category) {
      throw new Error("Category not found");
    }
    await category.destroy();
  } catch (error) {
    throw new Error("Error deleting category");
  }
};

export default {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
