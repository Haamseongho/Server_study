/**
 * Created by haams on 2017-07-14.
 */
var express = require("express");
var router = express.Router();
var passport = require("passport");
var fb_login = require("../passports/facebook");
var kk_login = require("../passports/kakao");
var nv_login = require("../passports/naver");
router.get("/login",function (req,res,next) {
    res.render("login.ejs");
});

router.get("/logout",function (req,res,next) {
    req.logout();
    res.redirect("/");
});

fb_login(router,passport);   // 페이스북 로그인
kk_login(router,passport);   // 카카오톡 로그인
nv_login(router,passport);   // 네이버 로그인

module.exports = router;