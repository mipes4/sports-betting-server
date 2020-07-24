"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class score extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      score.hasMany(models.predictions);
    }
  }
  score.init(
    {
      fullScore: { type: DataTypes.INTEGER, allowNull: false },
      totoScore: { type: DataTypes.INTEGER, allowNull: false },
      goalBonus: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      sequelize,
      modelName: "score",
    }
  );
  return score;
};
