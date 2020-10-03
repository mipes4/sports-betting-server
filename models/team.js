'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class team extends Model {
    static associate(models) {
      team.hasMany(models.user);
    }
  }
  team.init(
    {
      name: DataTypes.STRING,
      logo: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'team',
    }
  );
  return team;
};
