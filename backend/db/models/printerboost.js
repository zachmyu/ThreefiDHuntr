'use strict';
module.exports = (sequelize, DataTypes) => {
  const PrinterBoost = sequelize.define('PrinterBoost', {
    userId: DataTypes.INTEGER,
    printerId: DataTypes.INTEGER
  }, {});
  PrinterBoost.associate = function(models) {
    // associations can be defined here
  };
  return PrinterBoost;
};