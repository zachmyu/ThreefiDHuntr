'use strict';
module.exports = (sequelize, DataTypes) => {
  const OwnedPrinter = sequelize.define('OwnedPrinter', {
    userId: DataTypes.INTEGER,
    printerId: DataTypes.INTEGER
  }, {});
  OwnedPrinter.associate = function(models) {
    // associations can be defined here
  };
  return OwnedPrinter;
};