const express = require('express');
const router = express.Router();
const { checkJWT, isAdmin } = require('../controllers/authCheck');
const CommentController = require('../controllers/commentController');

router.get('/comments/list', checkJWT, isAdmin, CommentController.get);
router.post('/comments/add', checkJWT, isAdmin, CommentController.create);
router.get('/comments/:id', checkJWT, isAdmin, CommentController.getById);
router.put('/comments/:id', checkJWT, isAdmin, CommentController.update);
router.delete('/comments/:id', checkJWT, isAdmin, CommentController.delete);

module.exports = router;
