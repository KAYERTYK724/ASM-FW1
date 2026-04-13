const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

router.get('/users/list', UserController.get);
router.post('/users/add', UserController.create);
router.get('/users/:id', UserController.getById);
router.put('/users/:id', UserController.update);
router.delete('/users/:id', UserController.delete);
router.post('/users/register', UserController.register);
router.post('/users/login', UserController.login);

module.exports = router;
