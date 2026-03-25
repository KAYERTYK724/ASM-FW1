const connection = require('../database');
const { DataTypes } = require('sequelize');

const Product = connection.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },

    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },

    sale_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true
    },

    image: {
        type: DataTypes.STRING(255),
        allowNull: false
    },

    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },

    category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'categories',
            key: 'id'
        }
    },

    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }

}, {
    tableName: 'products',

    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = Product;
