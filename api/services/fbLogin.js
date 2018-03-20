
var FacebookTokenStrategy = require('passport-facebook-token');
const mongoose = require("mongoose");
const User = mongoose.model("userModel");
var passport = require("passport");
passport.use(new FacebookTokenStrategy({

    clientID: 'CLIENTID',
    clientSecret: 'CLIENT_SECRET'
}, function (accessToken, refreshToken, profile, done) {
    // User.findOrCreate({facebookId: profile.id}, function (error, user) {
    //   return done(error, user);
    // });
    User.findOne({
        'id': profile.id
    }, function (err, user) {
        if (err) {
            return done(err);
        }
        //No user was found... so create a new user with values from Facebook (all the profile. stuff)
        if (!user) {
            user = new User({
                id: profile.id,
                address: {
                    line1: null,
                    line2: null,
                    country: null,
                    state: null,
                    zipCode: null
                }
            });
            user.save(function (err) {
                if (err) console.log(err);
                console.log("The user is created Successfuly")
                let sendData = {
                    user,
                    profile
                }
                return done(err, sendData);
            });
        } else {
            //found user. Return
            console.log("The user is Found")
            let sendData = {
                user,
                profile
            }
            return done(err, sendData);
        }
    });
}
));

exports.passportSet = passport
