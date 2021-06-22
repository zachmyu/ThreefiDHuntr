'use strict';
module.exports = (sequelize, DataTypes) => {
    const FeatureType = sequelize.define('FeatureType', {
        printerId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        featureId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, {});
    FeatureType.associate = function (models) {
    // associations can be defined here
    };
    return FeatureType;
};
