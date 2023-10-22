const express = require("express");
const {logIn ,signUp,getSignUp,getLogin,logout,isAuth,notAuth} = require('../controllers/authController')
const {loginValidator,signupValidator} = require('../utils/validation/authValidator')
const router = express.Router();




router.route('/login').get(notAuth,getLogin).post(loginValidator,logIn)
router.route('/signup').get(notAuth,getSignUp).post(signupValidator,signUp)
router.route('/logout').post(isAuth,logout)

module.exports = router;