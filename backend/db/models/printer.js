'use strict';
module.exports = (sequelize, DataTypes) => {
  const Printer = sequelize.define('Printer', {
    brand: {
      type: DataTypes.STRING,
      allowNull: false,
      // validate: {
      //   len: [2, 40],
      // },
    },
    model: {
      type: DataTypes.STRING,
      allowNull: false,
      // validate: {
      //   len: [2, 40],
      // },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      // validate: {
      //   len: [2, 5000],
      // },
    },
    retailPrice: {
      type: DataTypes.INTEGER(8, 2),
      allowNull: false,
    },
    videoUrl: {
      type: DataTypes.STRING,
      validate: {
        len: [0, 256],
        isURL(value) {
          if (Validator.isNotURL(value)) {
            throw new Error('Please enter a valid URL.');
          }
        },
      },
    },
    pictureUrl: {
      type: DataTypes.STRING
      ,
      validate: {
        len: [0, 256],
        isURL(value) {
          if (Validator.isNotURL(value)) {
            throw new Error('Please enter a valid URL.');
          }
        },
      },
    },
    retailStatus: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {});
  Printer.associate = function (models) {
    const boostColMap = {
      through: 'PrinterBoosts',
      otherKey: 'userId',
      foreignKey: 'printerId'
    }
    const tagColMap = {
      through: 'PrinterTags',
      otherKey: 'userId',
      foreignKey: 'printerId'
    }
    const ownedColMap = {
      through: 'OwnedPrinters',
      otherKey: 'userId',
      foreignKey: 'printerId'
    }
    const featureColMap = {
      through: 'featureTypes',
      otherKey: 'featureId',
      foreignKey: 'printerId'
    }
    Printer.belongsToMany(models.User, boostColMap);
    Printer.belongsToMany(models.User, tagColMap);
    Printer.belongsToMany(models.User, ownedColMap);
    Printer.belongsToMany(models.PrinterFeature, featureColMap);
    Printer.hasMany(models.PrinterReview, { foreignKey: 'printerId' });
  };
  return Printer;
};