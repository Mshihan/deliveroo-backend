import { DataTypes, Model, Sequelize, UUID } from "sequelize";
import Dish from "./dish.model";
import User from "./user.model";

class DishRating extends Model {
  declare rating: number;
  declare comment: string;
}

export const initializeDishRating = (sequelize: Sequelize) => {
  if (!sequelize) {
    throw new Error("No Sequelize instance passed");
  }

  DishRating.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      rating: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      comment: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "DishRating",
    }
  );

  Dish.hasMany(DishRating, {
    sourceKey: "id",
    foreignKey: "dishId",
    as: "ratings",
  });

  DishRating.belongsTo(Dish, {
    foreignKey: "dishId",
    as: "dish",
  });

  User.hasMany(DishRating, {
    sourceKey: "id",
    foreignKey: "userId",
    as: "user",
  });

  DishRating.belongsTo(User, {
    foreignKey: "userId",
    as: "user",
  });
};

export default DishRating;
