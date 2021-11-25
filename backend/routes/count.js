const express = require('express');
const router = express.Router();

const countCtrl = require('../controllers/count');
const auth = require('../middleware/auth');

router.post('/like', auth, countCtrl.countLike);
router.post('/dislike', auth, countCtrl.countDislike);
router.post('/comment', auth, countCtrl.countComment);

module.exports = router;