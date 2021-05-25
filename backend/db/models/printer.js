'use strict';
module.exports = (sequelize, DataTypes) => {
  const Printer = sequelize.define('Printer', {
    brand: DataTypes.STRING,
    model: DataTypes.STRING,
    description: DataTypes.STRING,
    retailPrice: DataTypes.INTEGER,
    videoUrl: DataTypes.STRING,
    pictureUrl: DataTypes.STRING,
    retailStatus: DataTypes.STRING
  }, {});
  Printer.associate = function(models) {
    // associations can be defined here
  };
  return Printer;
};