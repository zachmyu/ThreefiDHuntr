'use strict';
module.exports = (sequelize, DataTypes) => {
    const Printer = sequelize.define('Printer', {
        brand: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        model: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        retailPrice: {
            type: DataTypes.DECIMAL(8, 2),
            allowNull: false,
        },
        videoUrl: {
            type: DataTypes.STRING,
            validate: {
            len: [0, 256],
            // isURL(value) {
            //   if (Validator.isNotURL(value)) {
            //     throw new Error('Please enter a valid URL.');
            //   }
            // },
            },
        },
        pictureUrl: {
            type: DataTypes.STRING
            ,
            validate: {
            len: [0, 256],
            // isURL(value) {
            //   if (Validator.isNotURL(value)) {
            //     throw new Error('Please enter a valid URL.');
            //   }
            // },
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
            foreignKey: 'printerId',
            onDelete: 'cascade',
            hooks: true
        }
        const tagColMap = {
            through: 'PrinterTags',
            otherKey: 'userId',
            foreignKey: 'printerId',
            onDelete: 'cascade',
            hooks: true
        }
        const ownedColMap = {
            through: 'OwnedPrinters',
            otherKey: 'userId',
            foreignKey: 'printerId',
            onDelete: 'cascade',
            hooks: true
        }
        const featureColMap = {
            through: 'featureTypes',
            otherKey: 'featureId',
            foreignKey: 'printerId',
            onDelete: 'cascade',
            hooks: true
        }
        Printer.belongsToMany(models.User, boostColMap);
        Printer.hasMany(models.PrinterBoost, { foreignKey: 'printerId', as: 'Boost', onDelete: 'cascade', hooks: true })
        Printer.belongsToMany(models.User, tagColMap);
        Printer.belongsToMany(models.User, ownedColMap);
        Printer.belongsToMany(models.PrinterFeature, featureColMap);
        Printer.hasMany(models.PrinterReview, { foreignKey: 'printerId', onDelete: 'cascade', hooks: true });
    };
    return Printer;
};
