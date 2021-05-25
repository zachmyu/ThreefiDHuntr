'use strict';
module.exports = (sequelize, DataTypes) => {
  const PrinterFeature = sequelize.define('PrinterFeature', {
    features: DataTypes.STRING
  }, {});
  PrinterFeature.associate = function(models) {
    // associations can be defined here
  };
  return PrinterFeature;
};