const CategoryModel = require('../models/categoryModel');

class CategoryController {

    // ✅ GET ALL (có parent)
    static async get(req, res) {
        try {
            const categories = await CategoryModel.findAll({
                include: [
                    {
                        model: CategoryModel,
                        as: 'parent',
                        attributes: ['id', 'name']
                    }
                ],
                order: [['id', 'ASC']]
            });

            res.status(200).json({
                status: 200,
                message: "Lấy danh sách thành công",
                data: categories
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // ✅ GET BY ID
    static async getById(req, res) {
        try {
            const { id } = req.params;

            const category = await CategoryModel.findByPk(id, {
                include: [
                    {
                        model: CategoryModel,
                        as: 'parent',
                        attributes: ['id', 'name']
                    }
                ]
            });

            if (!category) {
                return res.status(404).json({ message: "Id không tồn tại" });
            }

            res.status(200).json({
                status: 200,
                data: category
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // ✅ CREATE
    static async create(req, res) {
        try {
            const { name, parent_id, status } = req.body;

            const category = await CategoryModel.create({
                name,
                parent_id: parent_id || null,
                status: status ?? true
            });

            res.status(201).json({
                message: "Thêm mới thành công",
                category
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // ✅ UPDATE
    static async update(req, res) {
        try {
            const { id } = req.params;
            const { name, parent_id, status } = req.body;

            const category = await CategoryModel.findByPk(id);

            if (!category) {
                return res.status(404).json({ message: "Id không tồn tại" });
            }

            category.name = name;
            category.parent_id = parent_id || null;
            category.status = status ?? category.status;

            await category.save();

            res.status(200).json({
                message: "Cập nhật thành công",
                category
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // ✅ DELETE (chặn xóa nếu có con)
    static async delete(req, res) {
        try {
            const { id } = req.params;

            const category = await CategoryModel.findByPk(id);

            if (!category) {
                return res.status(404).json({ message: "Id không tồn tại" });
            }

            // ❗ kiểm tra có con không
            const hasChild = await CategoryModel.findOne({
                where: { parent_id: id }
            });

            if (hasChild) {
                return res.status(400).json({
                    message: "Danh mục này có danh mục con, không thể xóa"
                });
            }

            await category.destroy();

            res.status(200).json({ message: "Xóa thành công" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = CategoryController;