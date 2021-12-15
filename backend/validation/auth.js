const {check, validationResult} = require('express-validator');

exports.validateSignupRequest = [
  check('firstName').notEmpty().withMessage('FirstName is required').matches(/^[A-Za-z\s]+$/).withMessage('FirstName must be alphabetic.'),
  check('lastName').notEmpty().withMessage('LastName is required').matches(/^[A-Za-z\s]+$/).withMessage('LastName must be alphabetic.'),
  check('email').notEmpty().withMessage('email is required').isEmail().withMessage('Valid Email is required'),
  check('password').notEmpty().withMessage('password is required').isLength({min : 6}).withMessage('Password must be at least 6 characters long')
]

exports.validateSigninRequest = [
    
    check('email').notEmpty().withMessage('email is required').isEmail().withMessage('Valid Email is required'),
    check('password').notEmpty().withMessage('password is required').isLength({min : 6}).withMessage('Password must be at least 6 characters long')

]

exports.isRequestValidated = (req,res,next) => {
  const errors = validationResult(req);
  if(errors.array().length > 0) {
      return res.status(400).json({error : errors.array()[0].msg});
  }
  next();
}
