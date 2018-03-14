

const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const passport = require('../services/fbLogin').passportSet;


router
    .route("/loginWithFb")
    .post(passport.authenticate('facebook-token', {
        session: false
    }), userController.loginWithFb);


router
    .route("/updateAddress")
    .post(passport.authenticate('facebook-token', {
        session: false
    }), userController.updateAddress);


module.exports = router;
