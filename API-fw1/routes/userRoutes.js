const express = require('express');
const router = express.Router();

const UserController = require('../controllers/userController');
const { verifyToken, isAdmin } = require('../controllers/authCheck');

// AUTH
router.post('/users/register', UserController.register);
router.post('/users/login', UserController.login);

//  USER ADMIN ONLY
router.get('/users/list', UserController.get);

router.post('/users/add', verifyToken, isAdmin, UserController.create);

router.get('/users/:id', verifyToken, UserController.getById);

router.put('/users/:id', verifyToken, UserController.update);

router.delete('/users/:id', verifyToken, isAdmin, UserController.delete);

module.exports = router;
