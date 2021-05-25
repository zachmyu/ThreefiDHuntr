'use strict';
module.exports = (sequelize, DataTypes) => {
  const PrinterReview = sequelize.define('PrinterReview', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    printerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    review: {
      type: DataTypes.TEXT,
      allowNull: false,
    }
  }, {});
  PrinterReview.associate = function (models) {
    PrinterReview.belongsTo(models.User, { foreignKey: 'userId' })
    PrinterReview.belongsTo(models.Printer, { foreignKey: 'printerId' })
  };
  return PrinterReview;
};
