import { Op, col } from "sequelize";
import { Order } from "../model";
import { sequelize } from "./../database/database";

const getOrdersData = async (
  status?: string,
  startDate?: string,
  endDate?: string,
  orderBy?: string,
  asc?: string
) => {
  // orderBy sorting
  const orderColumn = orderBy === "date" ? col("orderDate") : col("status");

  const orders = await Order.findAll({
    where: {
      ...(status && { status }),
      ...(startDate &&
        endDate && {
          orderDate: {
            [Op.between]: [startDate, endDate],
          },
        }),
    },
    order: [[orderColumn, asc ?? "DESC"]],
  });
  return orders;
};

const getTopSellingItemsData = async (options: {
  byQuantity?: boolean;
  startDate?: string;
  endDate?: string;
  limit?: string;
}) => {
  const { limit, endDate, startDate, byQuantity } = options;
  // Set default values if they are not provided
  const defaultLimit = limit ? parseInt(limit, 10) : 5;
  const startDateFilter = startDate ? `AND o.createdAt >= '${startDate}'` : "";
  const endDateFilter = endDate ? `AND o.createdAt <= '${endDate}'` : "";

  // By Revenue
  const queryRevenue = `
    SELECT d.id AS dishId, d.title, SUM(oi.quantity * oi.price) AS totalRevenue
    FROM deliveroo.Dishes d
    INNER JOIN deliveroo.OrderItems oi ON d.id = oi.dishId
    INNER JOIN deliveroo.Orders o ON oi.orderId = o.id
    WHERE 1=1 ${startDateFilter} ${endDateFilter}
    GROUP BY d.id, d.title
    ORDER BY totalRevenue DESC
    LIMIT ${defaultLimit}
`;

  // By Number of Orders
  const queryOrderCount = `
    SELECT d.id AS dishId, d.title, COUNT(DISTINCT oi.orderId) AS orderCount
    FROM deliveroo.Dishes d
    INNER JOIN deliveroo.OrderItems oi ON d.id = oi.dishId
    INNER JOIN deliveroo.Orders o ON oi.orderId = o.id
    WHERE 1=1 ${startDateFilter} ${endDateFilter}
    GROUP BY d.id, d.title
    ORDER BY orderCount DESC
    LIMIT ${defaultLimit}
`;

  const query = byQuantity ? queryOrderCount : queryRevenue;

  const [data] = await sequelize.query(query);

  return data;
};

const getAverageOrderValueData = async (
  startDate?: string,
  endDate?: string
) => {
  const startDateFilter = startDate ? `AND orderDate >= '${startDate}'` : "";
  const endDateFilter = endDate ? `AND orderDate <= '${endDate}'` : "";

  const query = `
      SELECT AVG(totalPrice) AS average_order_price
      FROM Orders
      WHERE 1=1 ${startDateFilter} ${endDateFilter};
    `;

  const [averageOrderValue] = await sequelize.query(query);
  return averageOrderValue;
};

export default {
  getOrdersData,
  getTopSellingItemsData,
  getAverageOrderValueData,
};
