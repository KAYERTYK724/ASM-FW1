const { OrderDetail, Order, Product, User } = require('../models/associations'); // ✅ Import từ index.js

class OrderDetailController {
  // 📌 Lấy danh sách
  static async get(req, res) {
    try {
      const { user_id } = req.query;

      const data = await OrderDetail.findAll({
        include: [
          { model: Product, as: 'product', attributes: ['id', 'name', 'image', 'price', 'sale_price'] },
          {
            model: Order,
            as: 'order',
            where: user_id ? { user_id } : undefined,
            include: [{ model: User, as: 'user', attributes: ['id', 'name'] }]
          },
        ],
      });

      res.status(200).json({ status: 200, data });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }

  static async getCartByUser(req, res) {
    try {
      const { user_id } = req.params;

      const cartItems = await OrderDetail.findAll({
        include: [
          { model: Product, as: 'product', attributes: ['id', 'name', 'image', 'price', 'sale_price'] },
          {
            model: Order,
            as: 'order',
            where: { user_id, order_status: 'pending' }, // ✅ Dùng order_status thay vì order_id null
            required: true
          }
        ],
        order: [['id', 'DESC']],
      });

      return res.status(200).json({
        status: 200,
        data: cartItems,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Lỗi server' });
    }
  }

  // 📌 Lấy theo ID
  static async getById(req, res) {
    try {
      const { id } = req.params;
      const item = await OrderDetail.findByPk(id, {
        include: [
          { model: Product, as: 'product' },
          { model: Order, as: 'order' }
        ],
      });

      if (!item) {
        return res.status(404).json({ message: 'Id không tồn tại' });
      }

      res.status(200).json({
        status: 200,
        data: item,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // 📌 Thêm mới
  static async create(req, res) {
    try {
      console.log('BODY NHẬN ĐƯỢC:', req.body);

      const { user_id, product_id, price, quantity } = req.body;

      if (!user_id || !product_id) {
        return res.status(400).json({
          message: 'Thiếu user_id hoặc product_id',
          received: req.body,
        });
      }

      if (!quantity || quantity <= 0) {
        return res.status(400).json({ message: 'Số lượng phải > 0' });
      }

      let order = await Order.findOne({
        where: { user_id, order_status: 'pending' },
      });

      if (!order) {
        order = await Order.create({
          user_id,
          order_status: 'pending',
          name: 'Cart',
          phone: '0000000000',
          address: 'Cart',
          payments: 'cod',
          payment_status: 'pending',
        });
      }

      let item = await OrderDetail.findOne({
        where: { order_id: order.id, product_id },
      });

      if (item) {
        item.quantity += Number(quantity);
        await item.save();
      } else {
        item = await OrderDetail.create({
          order_id: order.id,
          product_id,
          price: Number(price),
          quantity: Number(quantity),
        });
      }

      res.status(201).json({ status: 201, message: 'Thêm vào giỏ thành công', data: item });
    } catch (error) {
      console.error('CREATE CART ERROR:', error);
      res.status(500).json({ error: error.message });
    }
  }

  // 📌 Cập nhật
  static async update(req, res) {
    try {
      const { id } = req.params;
      const { quantity } = req.body;

      const item = await OrderDetail.findByPk(id);
      if (!item) {
        return res.status(404).json({ message: 'Id không tồn tại' });
      }

      item.quantity = quantity;
      await item.save();

      res.status(200).json({
        status: 200,
        message: 'Cập nhật thành công',
        data: item,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // 📌 Xóa
  static async delete(req, res) {
    try {
      const { id } = req.params;
      const item = await OrderDetail.findByPk(id);
      if (!item) {
        return res.status(404).json({ message: 'Id không tồn tại' });
      }

      await item.destroy();
      res.status(200).json({ status: 200, message: 'Xóa thành công' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = OrderDetailController;
