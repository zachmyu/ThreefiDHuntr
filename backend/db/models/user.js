'use strict';
const bcrypt = require('bcryptjs');
const { Validator } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [4, 30],
                isNotEmail(value) {
                    if (Validator.isEmail(value)) {
                    throw new Error('Cannot be an email.');
                    }
                },
            },
        },
        fullName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [2, 256]
            },
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [3, 256]
            },
        },
        about: DataTypes.TEXT,
        hashedPassword: {
            type: DataTypes.STRING.BINARY,
            allowNull: false,
            validate: {
                len: [60, 60]
            },
        },
    },
    {
        defaultScope: {
            attributes: {
                exclude: ['hashedPassword', 'createdAt', 'updatedAt'],
            },
        },
        scopes: {
            currentUser: {
                attributes: { exclude: ['hashedPassword'] },
        },
            loginUser: {
                attributes: {},
            },
        },
    });
    User.prototype.toSafeObject = function () { // remember, this cannot be an arrow function
        const { id, username, email, fullName, about } = this; // context will be the User instance
        return { id, username, email, fullName, about };
    };
    User.prototype.validatePassword = function (password) {
        return bcrypt.compareSync(password, this.hashedPassword.toString());
    };
    User.getCurrentUserById = async function (id) {
        return await User.scope('currentUser').findByPk(id);
    };
    User.login = async function ({ credential, password }) {
        const { Op } = require('sequelize');
        const user = await User.scope('loginUser').findOne({
            where: {
                [Op.or]: {
                    username: credential,
                    email: credential,
                },
            },
        });

        if (user && user.validatePassword(password)) {
            return await User.scope('currentUser').findByPk(user.id);
        }
    };
    User.signup = async function ({ username, fullName, email, about, password }) {
        const hashedPassword = bcrypt.hashSync(password);
        const user = await User.create({
            username,
            fullName,
            email,
            about,
            hashedPassword,
        });
        return await User.scope('currentUser').findByPk(user.id);
    };

    User.associate = function (models) {
        const boostColMap = {
            through: 'PrinterBoosts',
            otherKey: 'printerId',
            foreignKey: 'userId',
            onDelete: 'cascade',
            hooks: true
        }
        const tagColMap = {
            through: 'PrinterTags',
            otherKey: 'printerId',
            foreignKey: 'userId',
            onDelete: 'cascade',
            hooks: true
        }
        const ownedColMap = {
            through: 'OwnedPrinters',
            otherKey: 'printerId',
            foreignKey: 'userId',
            onDelete: 'cascade',
            hooks: true
        }
        User.belongsToMany(models.Printer, boostColMap);
        User.belongsToMany(models.Printer, tagColMap);
        User.belongsToMany(models.Printer, ownedColMap);
        User.hasMany(models.PrinterReview, { foreignKey: 'userId', onDelete: 'cascade', hooks: true });
    };
    return User;
};
