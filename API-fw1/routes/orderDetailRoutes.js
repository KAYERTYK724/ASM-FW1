const express = require('express');
const router = express.Router();
const OrderDetailController = require('../controllers/orderDetailController');

router.get('/order-details/list', OrderDetailController.get);
router.post('/order-details/add', OrderDetailController.create);
router.get('/order-details/:id', OrderDetailController.getById);
router.put('/order-details/:id', OrderDetailController.update);
router.delete('/order-details/:id', OrderDetailController.delete);

module.exports = router;