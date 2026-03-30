const BlogModel = require('../models/blogModel');

class BlogController {

    // 📌 Lấy danh sách blog
    static async get(req, res) {
        try {
            const blogs = await BlogModel.findAll();

            res.status(200).json({
                status: 200,
                message: "Lấy danh sách thành công",
                data: blogs
            });

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // 📌 Lấy blog theo ID
    static async getById(req, res) {
        try {
            const { id } = req.params;

            const blog = await BlogModel.findByPk(id);

            if (!blog) {
                return res.status(404).json({ message: "Id không tồn tại" });
            }

            res.status(200).json({
                status: 200,
                data: blog
            });

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // 📌 Thêm blog
    static async create(req, res) {
        try {
            const { title, image, content } = req.body;

            const blog = await BlogModel.create({
                title,
                image,
                content
            });

            res.status(201).json({
                message: "Thêm mới thành công",
                blog
            });

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // 📌 Cập nhật blog
    static async update(req, res) {
        try {
            const { id } = req.params;

            const blog = await BlogModel.findByPk(id);
            if (!blog) {
                return res.status(404).json({ message: "Id không tồn tại" });
            }

            const { title, image, content } = req.body;

            blog.title = title;
            blog.image = image;
            blog.content = content;

            await blog.save();

            res.status(200).json({
                message: "Cập nhật thành công",
                blog
            });

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // 📌 Xóa blog
    static async delete(req, res) {
        try {
            const { id } = req.params;

            const blog = await BlogModel.findByPk(id);
            if (!blog) {
                return res.status(404).json({ message: "Id không tồn tại" });
            }

            await blog.destroy();

            res.status(200).json({
                message: "Xóa thành công"
            });

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = BlogController;
