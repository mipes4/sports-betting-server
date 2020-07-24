"use strict";

const bcrypt = require("bcrypt");
const { SALT_ROUNDS } = require("../config/constants");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "users",
      [
        {
          username: "user_p",
          email: "pascal@pascal.com",
          password: bcrypt.hashSync("pascal123", SALT_ROUNDS),
          frontName: "Pascal",
          lastName: "Duin",
          phoneNumber: "0612345678",
          admin: true,
          totaalToto: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: "user_r",
          email: "rick@rick.com",
          password: bcrypt.hashSync("rick123", SALT_ROUNDS),
          frontName: "Rick",
          lastName: "Wolt",
          phoneNumber: "0612345678",
          admin: false,
          totaalToto: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("users", null, {});
  },
};
