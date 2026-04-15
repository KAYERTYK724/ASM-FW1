const connection = require('../database');
const { DataTypes } = require('sequelize');
const Product = require('./productModel');
const User = require('./userModel');

const Comment = connection.define('Comment', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },

    date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },

    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },

    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'products',
            key: 'id'
        }
    },

    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    }

}, {
    tableName: 'comments',
    timestamps: false // vì bạn dùng "date" riêng
});

Comment.belongsTo(Product, { foreignKey: 'product_id', as: 'product' });
Comment.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

module.exports = Comment;
