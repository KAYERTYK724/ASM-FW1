const CommentModel = require('../models/commentModel');

class CommentController {

    // 📌 Lấy danh sách comment
    static async get(req, res) {
        try {
            const comments = await CommentModel.findAll();

            res.status(200).json({
                status: 200,
                message: "Lấy danh sách thành công",
                data: comments
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // 📌 Lấy comment theo ID
    static async getById(req, res) {
        try {
            const { id } = req.params;

            const comment = await CommentModel.findByPk(id);

            if (!comment) {
                return res.status(404).json({ message: "Id không tồn tại" });
            }

            res.status(200).json({
                status: 200,
                data: comment
            });

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // 📌 Thêm comment
    static async create(req, res) {
        try {
            const { content, product_id, user_id, status } = req.body;

            const comment = await CommentModel.create({
                content,
                product_id,
                user_id,
                status
            });

            res.status(201).json({
                message: "Thêm mới thành công",
                comment
            });

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // 📌 Cập nhật comment
    static async update(req, res) {
        try {
            const { id } = req.params;

            const comment = await CommentModel.findByPk(id);
            if (!comment) {
                return res.status(404).json({ message: "Id không tồn tại" });
            }

            const { content, status } = req.body;

            comment.content = content;
            comment.status = status;

            await comment.save();

            res.status(200).json({
                message: "Cập nhật thành công",
                comment
            });

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // 📌 Xóa comment
    static async delete(req, res) {
        try {
            const { id } = req.params;

            const comment = await CommentModel.findByPk(id);
            if (!comment) {
                return res.status(404).json({ message: "Id không tồn tại" });
            }

            await comment.destroy();

            res.status(200).json({
                message: "Xóa thành công"
            });

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = CommentController;