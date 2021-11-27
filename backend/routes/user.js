const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/profile/:id_user', auth, userCtrl.getUser);
router.put('/profile/:id_user', auth, multer.avatar, userCtrl.modifyUser);
router.delete('/profile/:id_user', auth, userCtrl.deleteUser);
router.get('/moderator/:id_user', auth, userCtrl.getModerator);

module.exports = router;