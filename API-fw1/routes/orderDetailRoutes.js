const express = require('express');
const router = express.Router();
const { checkJWT, isAdmin } = require('../controllers/authCheck');
const OrderDetailController = require('../controllers/orderDetailController');

router.get('/order-details/list', checkJWT, isAdmin, OrderDetailController.get);
router.post('/order-details/add', checkJWT, isAdmin, OrderDetailController.create);
router.get('/order-details/:id', checkJWT, isAdmin, OrderDetailController.getById);
router.put('/order-details/:id', checkJWT, isAdmin, OrderDetailController.update);
router.delete('/order-details/:id', checkJWT, isAdmin, OrderDetailController.delete);

module.exports = router;
