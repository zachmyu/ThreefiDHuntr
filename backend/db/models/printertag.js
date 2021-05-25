'use strict';
module.exports = (sequelize, DataTypes) => {
  const PrinterTag = sequelize.define('PrinterTag', {
    userId: DataTypes.INTEGER,
    printerId: DataTypes.INTEGER
  }, {});
  PrinterTag.associate = function(models) {
    // associations can be defined here
  };
  return PrinterTag;
};