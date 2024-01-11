import {
  DataTypes,
  Model,
  Sequelize,
  BelongsToManyAddAssociationMixin,
  HasManyAddAssociationsMixin,
  HasManyAddAssociationMixin,
  NonAttribute,
  HasManyGetAssociationsMixin,
  HasManySetAssociationsMixin,
} from "sequelize";
import Category, { CategoryAttributes } from "./category.model";
import { UserAttributes } from "./user.model";

class Restaurant extends Model {
  declare name: string;
  declare notes: string;
  declare location: string;
  declare photo: string;
  declare categories?: NonAttribute<Category[]>;

  declare addCategory: HasManyAddAssociationMixin<Category, string>;
  declare addCategories: HasManyAddAssociationsMixin<Category, number>;
  declare getCategories: HasManyGetAssociationsMixin<Category>;
  declare setCategories: HasManySetAssociationsMixin<Category, number>;
}

export class RestaurantCategory extends Model {}

export const initializeRestaurant = (sequelize: Sequelize) => {
  if (!sequelize) {
    throw new Error("No Sequelize instance passed");
  }
  Restaurant.init(
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
      notes: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      photo: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Restaurant",
    }
  );

  Restaurant.belongsToMany(Category, {
    through: "RestaurantCategory",
    // as: "categories",
  });
  Category.belongsToMany(Restaurant, {
    through: "RestaurantCategory",
    // as: "products",
  });
};

export default Restaurant;
