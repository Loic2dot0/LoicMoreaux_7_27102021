const express = require('express');
const router = express.Router();

const commentCtrl = require('../controllers/comment');

router.get('/post/:id_post', commentCtrl.getAllComment);
router.post('/post/:id_post', commentCtrl.createComment);
router.put('/:id_comment', commentCtrl.modifyComment);
router.delete('/:id_comment', commentCtrl.deleteComment);
router.post('/:id_comment/moderate', commentCtrl.moderateComment);

module.exports = router;