
const { check, validationResult } = require('express-validator');

exports.signupValidation = [
  check('email')
    .isEmail()
    .withMessage('Please include a valid email')
    .normalizeEmail(),
  check('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .matches(/\d/)
    .withMessage('Password must contain a number')
    .trim()
    .escape(),
  check('confirmPassword')
    .isLength({ min: 6 })
    .withMessage('Confirm password must be at least 6 characters long')
    .trim()
    .escape()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Passwords do not match');
      }
      return true;
    }),
];

exports.loginValidation = [
  check('email')
    .isEmail()
    .withMessage('Please include a valid email')
    .normalizeEmail(),
  check('password')
    .exists()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .trim()
    .escape(),
];

exports.validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
  