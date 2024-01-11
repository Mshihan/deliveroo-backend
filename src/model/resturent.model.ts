import {
  DataTypes,
  HasManyAddAssociationMixin,
  HasManyAddAssociationsMixin,
  HasManyGetAssociationsMixin,
  HasManySetAssociationsMixin,
  Model,
  NonAttribute,
  Sequelize,
} from "sequelize";
import Dish from "./dish.model";
import DishCategory from "./dish_category.model";

class Restaurant extends Model {
  declare name: string;
  declare notes: string;
  declare location: string;
  declare photo: string;
  declare dishes?: NonAttribute<Dish[]>;
  declare distance: string;
  declare openTime: string;
  declare deliveryFee: string;
  declare minimumAmount: string;

  declare addDish: HasManyAddAssociationMixin<Dish, string>;
  declare addDishes: HasManyAddAssociationsMixin<Dish, number>;
  declare getDishes: HasManyGetAssociationsMixin<Dish>;
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
      distance: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      openTime: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      deliveryFee: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      minimumAmount: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Restaurant",
    }
  );
};

export default Restaurant;
