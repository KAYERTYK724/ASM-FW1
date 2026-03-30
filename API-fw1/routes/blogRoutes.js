const express = require('express');
const router = express.Router();
const BlogController = require('../controllers/blogController');

router.get('/blogs/list', BlogController.get);
router.post('/blogs/add', BlogController.create);
router.get('/blogs/:id', BlogController.getById);
router.put('/blogs/:id', BlogController.update);
router.delete('/blogs/:id', BlogController.delete);

module.exports = router;
