/**
 * Created by haams on 2017-07-14.
 */
var passport = require("passport");
var FacebookStrategy = require("passport-facebook").Strategy;
var expressSession = require("express-session");
var express = require("express");
var router = express.Router();

module.exports = function (router, passport) {
    passport.use(new FacebookStrategy({
            clientID: "177565472782815",
            clientSecret: "1e62b82a2c98c2e10065bda05b519215",
            callbackURL: "/auth/facebook/callback"
        }, function (accessToken, refreshToken, profile, done) {
            console.log("facebook" + profile);
            done(null, profile);
        }
    ));

    passport.serializeUser(function (user, done) {
        console.log("serializeUser() 호출");
        done(null, user);
    });
    passport.deserializeUser(function (user, done) {
        console.log("deserializeUser() 호출");
        done(null, user);
    });

    router.use(expressSession({
        secret: "asdfqw12aa",
        resave: true,
        saveUninitialized: true
    }));
    router.use(passport.initialize());
    router.use(passport.session());

    router.get("/auth/facebook", passport.authenticate('facebook'));
    router.get("/auth/facebook/callback", passport.authenticate('facebook',
        {
            successRedirect: "/login_success",
            failureRedirect: "/login_fail"
        }));

    router.get("/login_success", ensureAuthenticated, function (req, res) {
        console.log("login_success 호출");
        res.redirect("/profile");
    });
    router.get("/login_fail", function (req, res) {
        console.log("로그인 실패");
        res.redirect("/"); // 로그인실패 --> 메인 페이지 이동
    });
    router.get("/profile", function (req, res) {
        console.log("프로필 호출");
        console.log(req.user);
        if (Array.isArray(req.user)) {
            res.render("profile.ejs", {user: req.user[0]._doc});
        } else {
            res.render("profile.ejs", {user: req.user});
        }
    });

    function ensureAuthenticated(req, res, next) {
        if (req.isAuthenticated()) {
            console.log("인증 완료");
            next();
        } else {
            res.redirect("/login");
        }
    }
};