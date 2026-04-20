const express = require('express');
const router = express.Router();
const CommentController = require('../controllers/commentController');

router.get('/comments', CommentController.get);
router.post('/comments', CommentController.create);
router.get('/comments/:id', CommentController.getById);
router.put('/comments/:id', CommentController.update);
router.delete('/comments/:id', CommentController.delete);

module.exports = router;