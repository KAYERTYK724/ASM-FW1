// models/index.js
const Product = require('./productModel');
const Category = require('./categoryModel');

Category.hasMany(Product, {
  foreignKey: 'category_id',
  as: 'products'
});

Product.belongsTo(Category, {
  foreignKey: 'category_id',
  as: 'category'
});

module.exports = { Product, Category };
