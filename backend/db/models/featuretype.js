'use strict';
module.exports = (sequelize, DataTypes) => {
  const FeatureType = sequelize.define('FeatureType', {
    printerId: DataTypes.INTEGER,
    featureId: DataTypes.INTEGER
  }, {});
  FeatureType.associate = function(models) {
    // associations can be defined here
  };
  return FeatureType;
};