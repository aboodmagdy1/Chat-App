const express = require("express");
const {isAuth,notAuth} = require('../controllers/authController')
const {getProfile,} = require('../controllers/profileController')
const router = express.Router();


router.use(isAuth)
router.get('/',getProfile)
router.get('/:id',getProfile)

module.exports = router;