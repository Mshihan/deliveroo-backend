import { Dish, Order, OrderItem } from "../model";
import { sequelize } from "../database/database";
import { Transaction } from "sequelize";
import { CustomError } from "../middleware/error.middleware";

interface OrderDetails {
  id: string;
  quantity: string;
}

const createOrder = async (orderDetails: OrderDetails[], userId: string) => {
  let transaction: Transaction;
  try {
    transaction = await sequelize.transaction();

    // Fetching dishes
    const dishIds = orderDetails.map((item) => item.id);

    const dishes = await Dish.findAll({
      where: {
        id: dishIds,
      },
      transaction,
    });

    // Calculating total
    const totalPrice = dishes.reduce((total, item) => {
      return total + parseFloat(item.price);
    }, 0);

    const orderObject = {
      userId,
      totalPrice,
    };

    // Create new order
    const newOrder = await Order.create(orderObject, { transaction });

    // Price derived form dishes
    const pricesMap = new Map(dishes.map((item) => [item.id, item.price]));

    // Create Order Items
    const orderItemPromises = orderDetails.map(async (item) => {
      const orderObject = {
        quantity: item.quantity,
        dishId: item.id,
        price: pricesMap.get(item.id) || null,
        orderId: newOrder.id,
      };

      return OrderItem.create(orderObject, { transaction });
    });

    await Promise.all(orderItemPromises);

    await transaction.commit();

    return newOrder;
  } catch (error) {
    if (transaction!) {
      await transaction.rollback();
    }

    throw new CustomError("Oder create failed", 400);
  }
};

const getOrders = async (): Promise<any> => {
  return await Order.findAll({
    include: [
      {
        model: OrderItem,
        as: "items",
      },
    ],
  });
};

const getOrderById = async (orderId: string): Promise<any> => {
  return await Order.findByPk(orderId, {
    include: {
      model: OrderItem,
      as: "items",
    },
  });
};

const completeOrder = async (orderId: string): Promise<any> => {
  const order = await Order.findByPk(orderId);

  if (!order) {
    return null;
  }

  order.status = true;
  await order.save();
  return order;
};

export default { createOrder, getOrders, getOrderById, completeOrder };
