const express = require("express");
const {isAuth,notAuth} = require('../controllers/authController')
const {deleteFriend,cancelRequest,acceptRequst,rejectRequst,getMyFriends} = require('../controllers/frindController')
const router = express.Router();




router.use(isAuth)
router.get('/all',getMyFriends)
router.post('/delete',deleteFriend)
router.post('/accept',acceptRequst)
router.post('/reject',rejectRequst)
router.post('/cancel',cancelRequest)

module.exports = router;