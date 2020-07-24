"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class match extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      match.hasMany(models.predictions);
    }
  }
  match.init(
    {
      homeTeamId: { type: DataTypes.INTEGER, allowNull: false },
      homeTeamName: { type: DataTypes.INTEGER, allowNull: false },
      homeTeamLogo: DataTypes.STRING,
      goalsHomeTeam: DataTypes.INTEGER,
      awayTeamId: { type: DataTypes.INTEGER, allowNull: false },
      awayTeamName: { type: DataTypes.INTEGER, allowNull: false },
      awayTeamLogo: DataTypes.STRING,
      goalsAwayTeam: DataTypes.INTEGER,
      eventTimeStamp: DataTypes.INTEGER,
      round: DataTypes.STRING,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "match",
    }
  );
  return match;
};
