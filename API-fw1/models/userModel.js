const connection = require('../database');
const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');

const User = connection.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    username: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },

    password: {
        type: DataTypes.STRING(255),
        allowNull: false
    },

    email: {
        type: DataTypes.STRING(150),
        allowNull: false,
        unique: true
    },

    name: {
        type: DataTypes.STRING(150),
        allowNull: true
    },

    phone: {
        type: DataTypes.STRING(20),
        allowNull: true
    },

    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },

    role: {
        type: DataTypes.ENUM('admin', 'user'),
        defaultValue: 'user'
    }

}, {
    tableName: 'users',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

// HASH PASSWORD
User.beforeCreate(async (user) => {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
});

module.exports = User;