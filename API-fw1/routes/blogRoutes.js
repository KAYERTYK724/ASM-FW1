const express = require('express');
const router = express.Router();
const { checkJWT, isAdmin } = require('../controllers/authCheck')
const BlogController = require('../controllers/blogController');

router.get('/blogs/list', checkJWT, isAdmin, BlogController.get);
router.post('/blogs/add', checkJWT, isAdmin, BlogController.create);
router.get('/blogs/:id', checkJWT, isAdmin, BlogController.getById);
router.put('/blogs/:id', checkJWT, isAdmin, BlogController.update);
router.delete('/blogs/:id', checkJWT, isAdmin, BlogController.delete);

module.exports = router;
