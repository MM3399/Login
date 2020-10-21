//exporting 3rd party modules
const express = require('express');

//exporting local modules
const signinController = require('../controller/signinController');
const loginController = require('../controller/loginController');

const router = express.Router();


//declaring api points
router.post('/signup', signinController.signIn);

router.post('/login' , loginController.logIn);

router.post('/login/forgotPassword', loginController.forgotPassowrd);

router.post('/login/resetPassword', loginController.resetPassword);

router.post('/users', loginController.verifyToken, loginController.user);

module.exports = router