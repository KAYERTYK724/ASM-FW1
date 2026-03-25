const UserModel = require('../models/userModel');

class UserController {

    // 📌 Lấy danh sách user
    static async get(req, res) {
        try {
            const users = await UserModel.findAll();

            res.status(200).json({
                status: 200,
                message: "Lấy danh sách thành công",
                data: users
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // 📌 Lấy user theo ID
    static async getById(req, res) {
        try {
            const { id } = req.params;

            const user = await UserModel.findByPk(id);

            if (!user) {
                return res.status(404).json({ message: "Id không tồn tại" });
            }

            res.status(200).json({
                status: 200,
                data: user
            });

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // 📌 Thêm user
    static async create(req, res) {
        try {
            const { username, password, email, name, phone, status, role } = req.body;

            const user = await UserModel.create({
                username,
                password,
                email,
                name,
                phone,
                status,
                role
            });

            res.status(201).json({
                message: "Thêm mới thành công",
                user
            });

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // 📌 Cập nhật user
    static async update(req, res) {
        try {
            const { id } = req.params;

            const user = await UserModel.findByPk(id);
            if (!user) {
                return res.status(404).json({ message: "Id không tồn tại" });
            }

            const { username, password, email, name, phone, status, role } = req.body;

            user.username = username;
            user.password = password;
            user.email = email;
            user.name = name;
            user.phone = phone;
            user.status = status;
            user.role = role;

            await user.save();

            res.status(200).json({
                message: "Cập nhật thành công",
                user
            });

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // 📌 Xóa user
    static async delete(req, res) {
        try {
            const { id } = req.params;

            const user = await UserModel.findByPk(id);
            if (!user) {
                return res.status(404).json({ message: "Id không tồn tại" });
            }

            await user.destroy();

            res.status(200).json({
                message: "Xóa thành công"
            });

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = UserController;