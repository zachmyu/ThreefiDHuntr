'use strict';
module.exports = (sequelize, DataTypes) => {
  const PrinterFeature = sequelize.define('PrinterFeature', {
    features: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {});
  PrinterFeature.associate = function (models) {
    const featureColMap = {
      through: 'featureTypes',
      otherKey: 'printerId',
      foreignKey: 'featureId'
    }
    PrinterFeature.belongsToMany(models.Printer, featureColMap);
  };
  return PrinterFeature;
};
