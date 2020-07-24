"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("predictions", "scoreId", {
      type: Sequelize.INTEGER,
      references: {
        model: "scores",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("predictions", "scoreId");
  },
};
