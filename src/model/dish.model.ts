import {
  DataTypes,
  HasManyAddAssociationMixin,
  Model,
  Sequelize,
} from "sequelize";
import Restaurant from "./resturent.model";

class Dish extends Model {
  declare id: string;
  declare title: string;
  declare description: string;
  declare contains: string;
  declare kcal: number;
  declare price: string;
  declare available: boolean;

  declare addRatings: HasManyAddAssociationMixin<Dish, string>;
}

export const initializeDishes = (sequelize: Sequelize) => {
  if (!sequelize) {
    throw new Error("No Sequelize instance passed");
  }

  Dish.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      contains: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      kcal: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      available: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Dish",
    }
  );
};

export default Dish;
