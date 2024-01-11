import {
  DataTypes,
  HasManyAddAssociationMixin,
  HasManyGetAssociationsMixin,
  Model,
  Sequelize,
} from "sequelize";
import Dish from "./dish.model";

export interface CategoryAttributes {
  id: string | null;
  name: string;
  restaurant_category_id: string;
}

class DishCategory extends Model {
  declare getDishes: HasManyGetAssociationsMixin<Dish>;
  declare addDish: HasManyAddAssociationMixin<Dish, string>;
}

export const initializeDishCategory = (sequelize: Sequelize) => {
  if (!sequelize) {
    throw new Error("No Sequelize instance passed");
  }

  DishCategory.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "DishCategory",
    }
  );

  DishCategory.hasMany(Dish, { foreignKey: "dishCategoryId", as: "dishes" });
  Dish.belongsTo(DishCategory, {
    foreignKey: "dishCategoryId",
    as: "dishCategory",
  });
};

export default DishCategory;
