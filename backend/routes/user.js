const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/profile/:id_user', userCtrl.getUser);
router.put('/profile/:id_user', userCtrl.modifyUser);
router.delete('/profile/:id_user', userCtrl.deleteUser);

module.exports = router;