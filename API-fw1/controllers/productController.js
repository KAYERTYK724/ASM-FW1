// const ProductModel = require('../models/productModel');
const { Product, Category } = require('../models');

class ProductController {
  // 📌 Lấy tất cả sản phẩm
  static async get(req, res) {
    try {
      const products = await Product.findAll({
        include: [
          {
            model: Category,
            as: 'category',
            attributes: ['id', 'name'],
          },
        ],
      });

      res.status(200).json({
        status: 200,
        message: 'Lấy danh sách sản phẩm thành công',
        data: products,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // 📌 Lấy sản phẩm theo ID
  static async getById(req, res) {
    try {
      const { id } = req.params;

      const product = await Product.findByPk(id, {
        include: [
          {
            model: Category,
            as: 'category',
            attributes: ['id', 'name'],
          },
        ],
      });

      if (!product) {
        return res.status(404).json({ message: 'Id không tồn tại' });
      }

      res.status(200).json({
        status: 200,
        data: product,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // 📌 Thêm sản phẩm
  static async create(req, res) {
    try {
      const { name, price, sale_price, image, description, category_id, status } = req.body;

      const product = await Product.create({
        name,
        price,
        sale_price,
        image,
        description,
        category_id,
        status,
      });

      res.status(201).json({
        message: 'Thêm sản phẩm thành công',
        product,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // 📌 Cập nhật sản phẩm
  static async update(req, res) {
    try {
      const { id } = req.params;

      const product = await Product.findByPk(id);
      if (!product) {
        return res.status(404).json({ message: 'Id không tồn tại' });
      }

      const { name, price, sale_price, image, description, category_id, status } = req.body;

      // cập nhật từng field
      product.name = name;
      product.price = price;
      product.sale_price = sale_price;
      product.image = image;
      product.description = description;
      product.category_id = category_id;
      product.status = status;

      await product.save();

      res.status(200).json({
        message: 'Cập nhật sản phẩm thành công',
        product,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // 📌 Xóa sản phẩm
  static async delete(req, res) {
    try {
      const { id } = req.params;

      const product = await Product.findByPk(id);
      if (!product) {
        return res.status(404).json({ message: 'Id không tồn tại' });
      }

      await product.destroy();

      res.status(200).json({
        message: 'Xóa sản phẩm thành công',
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = ProductController;
