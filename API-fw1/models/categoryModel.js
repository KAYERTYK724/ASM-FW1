const connection = require('../database');
const { DataTypes } = require('sequelize');

const Category = connection.define(
  'Category',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    parent_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'categories',
        key: 'id',
      },
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    tableName: 'categories',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
);

//  QUAN HỆ CHA - CON
Category.belongsTo(Category, {
  as: 'parent',
  foreignKey: 'parent_id',
});

Category.hasMany(Category, {
  as: 'children',
  foreignKey: 'parent_id',
});

module.exports = Category;