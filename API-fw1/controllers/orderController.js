const OrderModel = require('../models/orderModel');

class OrderController {
  // 📌 Lấy danh sách đơn hàng
  static async get(req, res) {
    try {
      const orders = await OrderModel.findAll();

      res.status(200).json({
        status: 200,
        message: 'Lấy danh sách thành công',
        data: orders,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // 📌 Lấy đơn hàng theo ID
  static async getById(req, res) {
    try {
      const { id } = req.params;

      const order = await OrderModel.findByPk(id);

      if (!order) {
        return res.status(404).json({ message: 'Id không tồn tại' });
      }

      res.status(200).json({
        status: 200,
        data: order,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async checkout(req, res) {
    try {
      const { user_id, name, phone, address, payments } = req.body;

      const order = await OrderModel.findOne({
        where: { user_id, order_status: 'pending' }
      });

      if (!order) {
        return res.status(404).json({ message: 'Không có giỏ hàng' });
      }

      // update thông tin
      order.name = name;
      order.phone = phone;
      order.address = address;
      order.payments = payments;
      order.order_status = 'confirmed';
      order.payment_status = payments === 'cod' ? 'pending' : 'paid';

      await order.save();

      return res.status(200).json({
        status: 200,
        message: 'Đặt hàng thành công',
        data: order
      });

    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Lỗi server' });
    }
  }

  // 📌 Thêm đơn hàng
  static async create(req, res) {
    try {
      const { name, phone, payments, payment_status, order_status, user_id } = req.body;

      const order = await OrderModel.create({
        name,
        phone,
        payments,
        payment_status,
        order_status,
        user_id,
      });

      res.status(201).json({
        message: 'Thêm mới thành công',
        order,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // 📌 Cập nhật đơn hàng
  static async update(req, res) {
    try {
      const { id } = req.params;

      const order = await OrderModel.findByPk(id);
      if (!order) {
        return res.status(404).json({ message: 'Id không tồn tại' });
      }

      const { name, phone, payments, payment_status, order_status, user_id } = req.body;

      order.name = name;
      order.phone = phone;
      order.payments = payments;
      order.payment_status = payment_status;
      order.order_status = order_status;
      order.user_id = user_id;

      await order.save();

      res.status(200).json({
        message: 'Cập nhật thành công',
        order,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // 📌 Xóa đơn hàng
  static async delete(req, res) {
    try {
      const { id } = req.params;

      const order = await OrderModel.findByPk(id);
      if (!order) {
        return res.status(404).json({ message: 'Id không tồn tại' });
      }

      await order.destroy();

      res.status(200).json({
        message: 'Xóa thành công',
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  static async getCartByUser(req, res) {
    try {
      const { user_id } = req.params;
      const cartItems = await OrderDetail.findAll({
        where: { user_id, order_id: null },
        include: [{ model: Product }],
        order: [['createdAt', 'DESC']],
      });
      return res.status(200).json({ status: 200, data: cartItems });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Lỗi server' });
    }
  }
}

module.exports = OrderController;
