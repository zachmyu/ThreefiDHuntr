'use strict';
module.exports = (sequelize, DataTypes) => {
  const PrinterBoost = sequelize.define('PrinterBoost', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    printerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {});
  PrinterBoost.associate = function (models) {
    // associations can be defined here
  };
  return PrinterBoost;
};
