"use strict";

const { faker } = require("@faker-js/faker");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const orderData = [];
    const orderItemData = [];

    const users = await queryInterface.sequelize.query("SELECT id FROM Users", {
      type: queryInterface.sequelize.QueryTypes.SELECT,
    });
    const userIds = users.map((user) => user.id);

    const dishes = await queryInterface.sequelize.query(
      "SELECT id FROM Dishes",
      {
        type: queryInterface.sequelize.QueryTypes.SELECT,
      }
    );
    const dishIds = dishes.map((dish) => dish.id);

    const ordersCount = 10000;

    for (let i = 0; i < ordersCount; i++) {
      const userId = userIds[faker.number.int({ max: users.length, min: 0 })];

      // Generate random number of items per order
      const itemsCount = faker.number.int({ min: 1, max: 5 });

      // Initialize total price for the current order
      let totalPrice = 0;

      const order = {
        id: faker.string.uuid(),
        userId: userId,
        orderDate: faker.date.between({ from: "2024-01-01", to: "2024-01-10" }),
        status: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      for (let j = 0; j < itemsCount; j++) {
        const dishId = dishIds[Math.floor(Math.random() * dishes.length)];
        const quantity = faker.number.int({ min: 1, max: 5 });
        const price = parseFloat(
          faker.number.float({
            max: 5,
            min: 1,
            precision: 0.01,
          })
        ); // Parse the price as float

        // Add the item price to the total price of the order
        totalPrice += price * quantity;

        const orderItem = {
          id: faker.string.uuid(),
          orderId: order.id,
          dishId: dishId,
          quantity: quantity,
          price: price,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        orderItemData.push(orderItem);
      }

      order.totalPrice = totalPrice.toFixed(2);
      orderData.push(order);
    }

    await queryInterface.bulkInsert("Orders", orderData, {});
    await queryInterface.bulkInsert("OrderItems", orderItemData, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("OrderItems", null, {});
    await queryInterface.bulkDelete("Orders", null, {});
  },
};
