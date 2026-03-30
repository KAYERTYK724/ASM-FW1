const connection = require('../database');
const { DataTypes } = require('sequelize');

const Blog = connection.define('Blog', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    title: {
        type: DataTypes.STRING(255),
        allowNull: false
    },

    image: {
        type: DataTypes.STRING(255),
        allowNull: false
    },

    content: {
        type: DataTypes.TEXT,
        allowNull: false
    }

}, {
    tableName: 'blogs',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = Blog;
