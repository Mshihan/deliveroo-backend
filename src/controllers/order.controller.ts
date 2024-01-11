import { NextFunction, Request, Response } from "express";
import { orderService } from "../service";
import { UserAttributes } from "../typings/express";

export const createOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const orderDetails = req.body;
    const userId = (req.user as UserAttributes).id;
    const newOrder = await orderService.createOrder(orderDetails, userId);
    res.status(201).json({
      data: newOrder,
      message: "Order create successful",
      error: null,
      code: 201,
    });
  } catch (error) {
    next(error);
  }
};

const getOrders = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const orders = await orderService.getOrders();
    res.status(200).json({
      data: orders,
      message: "Orders fetch successful",
      error: null,
      code: 200,
    });
  } catch (error) {
    next(error);
  }
};

const getOrderById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { orderId } = req.params;
    const order = await orderService.getOrderById(orderId);
    if (!order) {
      res.status(404).json({
        data: order,
        message: "Order not Found",
        error: "Order not Found",
        code: 404,
      });
      return;
    }
    res.status(200).json({
      data: order,
      message: "Orders fetch successful",
      error: null,
      code: 200,
    });
  } catch (error) {
    next(error);
  }
};

const completeOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { orderId } = req.params;
    const order = await orderService.completeOrder(orderId);
    if (!order) {
      res.status(404).json({
        data: order,
        message: "Order not Found",
        error: "Order not Found",
        code: 404,
      });
      return;
    }
    res.status(204).json({
      data: order,
      message: "Orders status change successful",
      error: null,
      code: 204,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  createOrder,
  getOrders,
  getOrderById,
  completeOrder,
};
