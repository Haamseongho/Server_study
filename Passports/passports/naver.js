/**
 * Created by haams on 2017-07-14.
 */
var passport = require("passport");
var NaverStrategy = require("passport-naver").Strategy;
var expressSession = require("express-session");
var express = require("express");
var router = express.Router();

module.exports = function (router, passport) {
    passport.use(new NaverStrategy({
            clientID: "rgHsLNQFvoIixo_F6Ec2",
            clientSecret : "m9lcXwdlus",
            callbackURL: "/auth/naver/callback"
        }, function (accessToken, refreshToken, profile, done) {
            console.log("naver" + profile);
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
        secret: "asdfqw12bb",
        resave: true,
        saveUninitialized: true
    }));
    router.use(passport.initialize());
    router.use(passport.session());

    router.get("/auth/naver", passport.authenticate('naver'));
    router.get("/auth/naver/callback", passport.authenticate('naver',
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