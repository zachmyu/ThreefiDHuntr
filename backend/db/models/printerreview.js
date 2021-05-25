'use strict';
module.exports = (sequelize, DataTypes) => {
  const PrinterReview = sequelize.define('PrinterReview', {
    userId: DataTypes.INTEGER,
    printerId: DataTypes.INTEGER,
    review: DataTypes.TEXT
  }, {});
  PrinterReview.associate = function(models) {
    // associations can be defined here
  };
  return PrinterReview;
};