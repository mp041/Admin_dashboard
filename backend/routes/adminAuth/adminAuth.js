const express = require('express');

const router = express.Router();
const User = require('../../models/userSchema')
const bcrypt = require('bcrypt');
const adminCtrl = require('../../controllers/adminCtrl/adminCtrl');
const {validateSignupRequest , isRequestValidated, validateSigninRequest } = require('../../validation/auth');
const userMiddleware = require('../../middlewares/userMiddleware');

const auth = require('../../middlewares/auth');

// router.get('/', (req,res) => {
//
//     res.json("Getting data from router folder")
// })

router.post('/admin/register',validateSignupRequest,isRequestValidated, adminCtrl.register)

router.post('/admin/login',validateSigninRequest,isRequestValidated,  adminCtrl.login)

router.post('/admin/logout',  adminCtrl.logout)


// router.get('/get', auth,userCtrl.getUser)

// router.get('/refresh_token',auth, userCtrl.refreshToken)

// router.get('/logout', userCtrl.logout)

     // res.json("Sending data from router folder")

module.exports = router;
