const Order = require('./orderModel');
const OrderDetail = require('./orderDetailModel');
const Product = require('./productModel');
const User = require('./userModel');

// 1 Order có nhiều OrderDetail
Order.hasMany(OrderDetail, { foreignKey: 'order_id', as: 'orderDetails' });
OrderDetail.belongsTo(Order, { foreignKey: 'order_id', as: 'order' });

// OrderDetail thuộc về 1 Product
OrderDetail.belongsTo(Product, { foreignKey: 'product_id', as: 'product' });
Product.hasMany(OrderDetail, { foreignKey: 'product_id', as: 'orderDetails' });

// Order thuộc về 1 User
Order.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
User.hasMany(Order, { foreignKey: 'user_id', as: 'orders' });

module.exports = { Order, OrderDetail, Product, User };
