"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("matches", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      homeTeamId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      homeTeamName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      homeTeamLogo: {
        type: Sequelize.STRING,
      },
      goalsHomeTeam: {
        type: Sequelize.INTEGER,
      },
      awayTeamId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      awayTeamName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      awayTeamLogo: {
        type: Sequelize.STRING,
      },
      goalsAwayTeam: {
        type: Sequelize.INTEGER,
      },
      eventTimeStamp: {
        type: Sequelize.INTEGER,
      },
      round: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("matches");
  },
};
