const connection = require('../database');
const { DataTypes } = require('sequelize');

const Order = connection.define(
  'Order',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(150),
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    address: {
      // ✅ THÊM MỚI: SQL có cột này NOT NULL
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: '',
    },
    payments: {
      type: DataTypes.ENUM('cod', 'banking'),
      defaultValue: 'cod',
    },
    payment_status: {
      type: DataTypes.ENUM('pending', 'paid', 'failed'),
      defaultValue: 'pending',
    },
    order_status: {
      type: DataTypes.ENUM('pending', 'confirmed', 'shipping', 'completed', 'cancelled'),
      defaultValue: 'pending',
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
  },
  {
    tableName: 'orders',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
);

module.exports = Order;
