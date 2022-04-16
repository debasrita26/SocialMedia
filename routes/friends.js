const express = require('express');
const router = express.Router();
const passport = require('passport');
const friendsController = require('../controllers/friendships_controller');

router.get('/create' , passport.checkAuthentication ,friendsController.addFriend);
router.get('/destroy',friendsController.destroy);
module.exports = router;