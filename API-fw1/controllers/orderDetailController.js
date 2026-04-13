const OrderDetailModel = require('../models/orderDetailModel');

class OrderDetailController {

    // 📌 Lấy danh sách
    static async get(req, res) {
        try {
            const data = await OrderDetailModel.findAll();

            res.status(200).json({
                status: 200,
                message: "Lấy danh sách thành công",
                data
            });

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // 📌 Lấy theo ID
    static async getById(req, res) {
        try {
            const { id } = req.params;

            const item = await OrderDetailModel.findByPk(id);

            if (!item) {
                return res.status(404).json({ message: "Id không tồn tại" });
            }

            res.status(200).json({
                status: 200,
                data: item
            });

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // 📌 Thêm mới
    static async create(req, res) {
        try {
            const { order_id, product_id, price, quantity } = req.body;

            const item = await OrderDetailModel.create({
                order_id,
                product_id,
                price,
                quantity
            });

            res.status(201).json({
                message: "Thêm mới thành công",
                data: item
            });

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // 📌 Cập nhật
    static async update(req, res) {
        try {
            const { id } = req.params;

            const item = await OrderDetailModel.findByPk(id);
            if (!item) {
                return res.status(404).json({ message: "Id không tồn tại" });
            }

            const { order_id, product_id, price, quantity } = req.body;

            item.order_id = order_id;
            item.product_id = product_id;
            item.price = price;
            item.quantity = quantity;

            await item.save();

            res.status(200).json({
                message: "Cập nhật thành công",
                data: item
            });

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // 📌 Xóa
    static async delete(req, res) {
        try {
            const { id } = req.params;

            const item = await OrderDetailModel.findByPk(id);
            if (!item) {
                return res.status(404).json({ message: "Id không tồn tại" });
            }

            await item.destroy();

            res.status(200).json({
                message: "Xóa thành công"
            });

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = OrderDetailController;