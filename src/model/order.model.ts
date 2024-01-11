import { DataTypes, Model, Sequelize } from "sequelize";
import { sequelize } from "../database/database";

class Order extends Model {
  declare id: number;
  declare userId: number;
  declare totalPrice: number;
  declare orderDate: Date;
  declare status: boolean;
}

export const initializeOrder = (sequelize: Sequelize) => {
  if (!sequelize) {
    throw new Error("No Sequelize instance passed");
  }
  Order.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: true,
      },
      totalPrice: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      orderDate: {
        type: DataTypes.DATE,
        allowNull: false,

        defaultValue: DataTypes.NOW,
      },
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Order",
      timestamps: true,
    }
  );
};

export default Order;
