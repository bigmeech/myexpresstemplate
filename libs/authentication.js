var rek = require("rekuire");
var config = rek('config');
var express = require('express');
var FacebookStrategy = require("passport-facebook").Strategy;
var TwitterStrategy  = require('passport-twitter').Strategy;
var passport = require("passport");
var _ = require("lodash");
var DB = rek("database");


/*
*
* Passport serialization and deserializaation of user objects into session
*
*
* */

 passport.serializeUser(function(user, done){
    done(null, user)
});

passport.deserializeUser(function(obj, done){
    done(null, obj)
});

/*
 *
 * Facebook related login/signup
 *
 * */

module.exports = function (app) {

    /*
     *
     * Facebook Strategy Definition
     *
     * */

    passport.use(new FacebookStrategy({
        clientID: config.keys.facebook.clientID,
        clientSecret: config.keys.facebook.clientSecret,
        callbackURL: config.keys.facebook.callbackUrl
    }, function (accessToken, refreshToken, profile, done) {

        /*
        *
        * If we get a Mongo Error with code 11000 after this, that means this user has used facebook login previously
        * and exist in our system, instead of killing the app like we normally do to other errors we can just allow the user in
        * regardless. But we have to find a way to send his user details back to the him
        *
        * */
        var LocalUserModel = DB.model('User');


    }));

    /*
     *
     * facebook login url
     * use scopes to tell passport the things you will like to retrieve from the oauth provider.
     *
     * */
    app.get(
        '/auth/facebook',
        passport.authenticate('facebook',{ scope: ['user_likes','email','user_friends']}),
        function (req, res) {/*
         this middleware will not be used since the request has been redirected to facebook servers
         */});

    app.get(
        '/auth/facebook/callback',
        passport.authenticate('facebook',{failureRedirect:'/login'}),
        function (req, res) {
            return res.json(req.session.passport.user);
        });


    passport.use(new TwitterStrategy({

            consumerKey     : config.keys.twitter.consumerKey,
            consumerSecret  : config.keys.twitter.consumerSecret,
            callbackURL     : config.keys.twitter.callbackURL

        },
        function(token, tokenSecret, profile, done) {

            var User = DB.model('User');
            // make the code asynchronous
            // User.findOne won't fire until we have all our data back from Twitter
            // store user information
        }));


    /*
     *
     * twitter routes
     *
     * Twitter bitches a lot about local hostnames and only like real IPS and hostnames. So to make valid reuest during development,
     * use 127.0.0.1 instead of localhost
     *
     * */
    app.get('/auth/twitter',
        passport.authenticate('twitter'));

    app.get(
        '/auth/twitter/callback',
        passport.authenticate('twitter',{failureRedirect:'/login'}),
        function (req, res) {
            return res.json(req.session.passport.user);
        });
};
