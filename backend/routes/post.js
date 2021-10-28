const express = require('express');
const router = express.Router();

const postCtrl = require('../controllers/post');

router.get('/', postCtrl.getAllPost);
router.get('/:id_post', postCtrl.getOnePost);
router.post('/', postCtrl.createPost);
router.put('/:id_post', postCtrl.modifyPost);
router.delete('/:id_post', postCtrl.deletePost);
router.post('/:id_post/like', postCtrl.likePost);
router.post('/:id_post/moderate', postCtrl.moderatePost);

module.exports = router;