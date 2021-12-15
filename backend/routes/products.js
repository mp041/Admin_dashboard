const express  = require('express');
const router = express.Router();
const Product  = require('../models/productSchema')
const productCtrl  = require('../controllers/productCtrl')
const auth = require('../middlewares/auth')
const adminMiddleware = require('../middlewares/adminMiddleware');
const multer = require('multer');
const shortid = require('shortid');
const path = require('path');

const storage = multer.diskStorage({
  destination : function (req,file,cb)  {
    cb(null , path.join(path.dirname(__dirname),'uploads'))
  },
  filename : function (req,file,cb) {
    cb(null ,shortid.generate() + '-' + file.originalname)
  }
})

const upload = multer({storage});
router.post('/product/create' ,auth,adminMiddleware,upload.array('productPicture'), productCtrl.createProduct)
router.get('/product/get',productCtrl.get)
// router.get('/category/get',  categoryCtrl.getCategory);

module.exports = router;
