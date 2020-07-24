"use strict";
const { Model, DataTypes } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      user.hasMany(models.predictions);
    }
  }
  user.init(
    {
      username: {
        type: DataTypes.CITEXT,
        unique: true,
        allowNull: false,
      },
      email: { type: DataTypes.STRING, unique: true, allowNull: false },

      password: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "password",
      },
      frontName: {
        type: DataTypes.STRING,
        allowNull: false,
        defaulValue: "voornaam",
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "achternaam",
      },
      phoneNumber: { type: DataTypes.STRING, allowNull: false },
      admin: { type: DataTypes.BOOLEAN, defaultValue: false },
      totaalToto: { type: DataTypes.BOOLEAN, defaultValue: true },
    },
    {
      sequelize,
      modelName: "user",
    }
  );
  return user;
};
