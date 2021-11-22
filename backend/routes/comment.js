const express = require('express');
const router = express.Router();

const commentCtrl = require('../controllers/comment');
const auth = require('../middleware/auth');

router.get('/post/:id_post', auth, commentCtrl.getAllComment);
router.post('/post/:id_post', auth, commentCtrl.createComment);
router.put('/:id_comment', auth, commentCtrl.modifyComment);
router.delete('/:id_comment', auth, commentCtrl.deleteComment);
router.post('/:id_comment/moderate', auth, commentCtrl.moderateComment);

module.exports = router;