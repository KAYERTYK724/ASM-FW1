const CommentModel = require('../models/commentModel');
const Product = require('../models/productModel');
const User = require('../models/userModel');

class CommentController {

  static async get(req, res) {
    try {
      const comments = await CommentModel.findAll({
        include: [
          {
            model: Product,
            as: 'product',
            attributes: ['id', 'name'],
          },
          {
            model: User,
            as: 'user',
            attributes: ['id', 'name'],
          },
        ],
      });

      res.status(200).json({
        status: 200,
        message: 'Lấy danh sách thành công',
        data: comments,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // 📌 Lấy comment theo ID
  static async getById(req, res) {
    try {
      const { id } = req.params;

      const comment = await CommentModel.findByPk(id, {
        include: [
          {
            model: Product,
            as: 'product',
            attributes: ['id', 'name']
          },
          {
            model: User,
            as: 'user',
            attributes: ['id', 'name']
          }
        ]
      });

      res.status(200).json({
        data: comments
      });

    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getById(req, res) {
    try {
      const comment = await CommentModel.findByPk(req.params.id, {
        include: [
          { model: Product, as: 'product' },
          { model: User, as: 'user' }
        ]
      });

      res.json({ data: comment });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async create(req, res) {
    try {
      const comment = await CommentModel.create(req.body);
      res.json({ data: comment });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async update(req, res) {
    try {
      await CommentModel.update(req.body, {
        where: { id: req.params.id }
      });

      res.json({ message: 'Updated' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async delete(req, res) {
    try {
      await CommentModel.destroy({
        where: { id: req.params.id }
      });

      res.json({ message: 'Deleted' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = CommentController;