"use strict";

const { faker } = require("@faker-js/faker");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Add Users
    const usersData = [];
    const numUsers = 10;

    const user = {
      id: faker.string.uuid(),
      username: "test",
      email: "test@test.com",
      password: "$2b$10$hXKLoEFvb/yn/00woN4OGuphYOr5Zbr9bXSCXwOwaXl.5kRwLyWlq", // 123456
      refreshToken: "",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    user.push(usersData);

    for (let i = 0; i < numUsers; i++) {
      const user = {
        id: faker.string.uuid(),
        username: faker.person.fullName(),
        email: faker.internet.email(),
        password:
          "$2b$10$hXKLoEFvb/yn/00woN4OGuphYOr5Zbr9bXSCXwOwaXl.5kRwLyWlq", // 123456
        refreshToken: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      usersData.push(user);
    }

    // Add restaurants
    const restaurantData = [];
    const categoryData = [];
    const dishData = [];

    const restaurantCategories = [
      "New daily Specials",
      "Salads",
      "Hot Power Bowls",
      "Gym food",
      "Bundles",
      "Rainbow Wraps",
      "Vegan Menu",
      "Snack & Sides",
      "Yoghurt & fruits",
      "Cold drinks",
    ];

    const newRestaurants = 10;

    for (let i = 0; i < newRestaurants; i++) {
      const restaurant = {
        id: faker.string.uuid(),
        name: faker.company.name(),
        notes: faker.lorem.paragraph(),
        location: `${faker.location.latitude()}- ${faker.location.longitude()}`,
        photo: faker.image.urlLoremFlickr({ category: "food" }),
        distance: faker.number.float({ precision: 0.1, max: 5, min: 0 }),
        openTime: `${faker.number.int({ min: 7, max: 12 })}:00`,
        deliveryFee: faker.number.float({ precision: 0.1, max: 5, min: 0 }),
        minimumAmount: faker.number.float({ precision: 0.1, max: 5, min: 0 }),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      restaurantData.push(restaurant);

      // Associating random categories with the restaurant
      const selectedCategories = faker.helpers
        .shuffle(restaurantCategories)
        .slice(0, 6);
      const categoryIds = selectedCategories.map((categoryName) => {
        const category = {
          id: faker.string.uuid(),
          name: categoryName,
          restaurant_category_id: restaurant.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        categoryData.push(category);
        return category.id;
      });

      for (let i = 0; i < 6; i++) {
        const dish = {
          id: faker.string.uuid(),
          title: faker.lorem.words(3),
          description: faker.lorem.sentence(),
          contains: `Contains ${faker.lorem.words(2)}`,
          kcal: faker.number.int({ min: 200, max: 1000 }),
          price: faker.number.float({ precision: 0.1, max: 10, min: 0 }),
          available: faker.datatype.boolean(),
          dishCategoryId: categoryIds[i],
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        dishData.push(dish);
      }
    }

    await queryInterface.bulkInsert("Users", usersData, {});
    await queryInterface.bulkInsert("Restaurants", restaurantData, {});
    await queryInterface.bulkInsert("DishCategories", categoryData, {});
    await queryInterface.bulkInsert("Dishes", dishData, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Dishes", null, {});
    await queryInterface.bulkDelete("Restaurants", null, {});
    await queryInterface.bulkDelete("DishCategories", null, {});
    await queryInterface.bulkDelete("Users", null, {});
  },
};

// npx sequelize-cli db:seed --seed 20240110143819-demo-restaurants
