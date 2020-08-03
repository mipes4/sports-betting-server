"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("predictions", "matchId", {
      type: Sequelize.INTEGER,
      references: {
        model: "matches",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });

    await queryInterface.addColumn("predictions", "totalScore", {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("predictions", "matchId");
    await queryInterface.removeColumn("predictions", "totalScore");
  },
};
