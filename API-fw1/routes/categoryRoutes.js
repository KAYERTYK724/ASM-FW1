const express = require('express');
const router = express.Router();
const { checkJWT, isAdmin } = require('../controllers/authCheck');
const CategoryController = require('../controllers/categoryController');

router.get('/categories/list', CategoryController.get);
router.post('/categories/add', CategoryController.create);
router.get('/categories/:id', CategoryController.getById)
router.put("/categories/:id", CategoryController.update);
router.delete("/categories/:id", CategoryController.delete);
module.exports = router;
