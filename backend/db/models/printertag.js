'use strict';
module.exports = (sequelize, DataTypes) => {
    const PrinterTag = sequelize.define('PrinterTag', {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        printerId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, {});
    PrinterTag.associate = function (models) {
    // associations can be defined here
    };
    return PrinterTag;
};
