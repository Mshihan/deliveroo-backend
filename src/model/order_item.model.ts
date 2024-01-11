import { DataTypes, Model, Sequelize } from "sequelize";
import Order from "./order.model";
import Dish from "./dish.model";
import DishCategory from "./dish_category.model";
import Restaurant from "./resturent.model";

class OrderItem extends Model {
  public id!: number;
  public orderId!: number;
  public dishId!: number;
  public quantity!: number;
  public price!: number;
}

export const initializeOrderItem = (sequelize: Sequelize) => {
  if (!sequelize) {
    throw new Error("No Sequelize instance passed");
  }

  OrderItem.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,

        primaryKey: true,
      },
      orderId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      dishId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "OrderItem",
    }
  );

  OrderItem.belongsTo(Order, { foreignKey: "orderId", as: "order" });
  Order.hasMany(OrderItem, { foreignKey: "orderId", as: "items" });

  OrderItem.belongsTo(Dish, { foreignKey: "dishId", as: "dish" });
  Dish.hasMany(OrderItem, { foreignKey: "dishId", as: "orders" });

  DishCategory.belongsTo(Restaurant, {
    foreignKey: "restaurant_category_id",

    as: "restaurant",
  });

  Restaurant.hasMany(DishCategory, {
    foreignKey: "restaurant_category_id",
    as: "categories",
  });
};

export default OrderItem;
