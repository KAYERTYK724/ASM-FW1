const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/productController');

// 📌 Lấy danh sách sản phẩm
router.get('/products/list', ProductController.get);
// 📌 Thêm sản phẩm
router.post('/products/add', ProductController.create);
// 📌 Lấy sản phẩm theo ID
router.get('/products/:id', ProductController.getById);
// 📌 Cập nhật sản phẩm
router.put('/products/:id', ProductController.update);
// 📌 Xóa sản phẩm
router.delete('/products/:id', ProductController.delete);

module.exports = router;