const express = require("express");
const {isAuth,notAuth} = require('../controllers/authController')
const {deleteFriend,cancelRequest,acceptRequst,rejectRequst} = require('../controllers/frindController')
const router = express.Router();




router.use(isAuth)

router.post('/delete',deleteFriend)
router.post('/accept',acceptRequst)
router.post('/reject',rejectRequst)
router.post('/cancel',cancelRequest)

module.exports = router;