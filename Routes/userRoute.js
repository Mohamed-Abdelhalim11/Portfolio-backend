const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticateToken = require('../middelware/authentication');

router.route('/user')
    .get(userController.getData);

router.route('/user/signUp')
    .post(userController.SIGNUP);

router.route('/user/login')
    .post(userController.LOGIN);

router.use(authenticateToken); 

router.route('/user')
    .post(userController.addData)

module.exports = router;
