import { NextFunction, Request, Response } from "express";
import { reportService } from "../service";

export const getOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      status,
      start_date,
      end_date,
      order_by,
      asc,
    }: {
      status?: string;
      start_date?: string;
      end_date?: string;
      order_by?: string;
      asc?: string;
    } = req.query;

    const ordersData = await reportService.getOrdersData(
      status,
      start_date,
      end_date,
      order_by,
      asc
    );

    res.status(200).json({
      data: ordersData,
      message: "Orders fetch successful",
      error: null,
      code: 200,
    });
  } catch (error) {
    next(error);
  }
};

export const getTopSellingItems = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { startDate, quantity, endDate, limit } = req.params;
    const topSellingItemsData = await reportService.getTopSellingItemsData({
      byQuantity: quantity ? false : true,
      startDate,
      endDate,
      limit,
    });

    res.status(200).json({
      data: topSellingItemsData,
      message: "Top selling items fetch successful",
      error: null,
      code: 200,
    });
  } catch (error) {
    next(error);
  }
};

export const getAverageOrderValue = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { start_date, end_date }: { start_date?: string; end_date?: string } =
      req.query;

    if (!start_date || !end_date) {
      res.status(400).json({
        data: [],
        code: 400,
        message: "Start and end dates are required. Please provide them",
        error: "Start and end dates are required. Please provide them",
      });
    }
    const averageOrderValueData = await reportService.getAverageOrderValueData(
      start_date,
      end_date
    );
    res.status(200).json({
      data: averageOrderValueData,
      message: "Average order value fetch successful",
      error: null,
      code: 200,
    });
  } catch (error) {
    next(error);
  }
};

export default { getOrders, getTopSellingItems, getAverageOrderValue };
