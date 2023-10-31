const express = require("express");
const {getHome}  = require('../controllers/homeController')
const router = express.Router();

router.get("/",getHome);

module.exports = router;
