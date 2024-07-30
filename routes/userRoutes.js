const express = require('express');
const router = express.Router();
const { signupValidation, loginValidation, validate } = require('../middleware/userValidation');
const userController = require('../controllers/userController');

router.post('/signup', signupValidation, validate, userController.signup);
router.post('/login', loginValidation, validate, userController.login);

module.exports = router;
