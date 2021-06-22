'use strict';
module.exports = (sequelize, DataTypes) => {
    const OwnedPrinter = sequelize.define('OwnedPrinter', {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        printerId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, {});
    OwnedPrinter.associate = function (models) {
    // associations can be defined here
    };
    return OwnedPrinter;
};
