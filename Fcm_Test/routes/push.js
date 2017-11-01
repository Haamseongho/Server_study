/**
 * Created by haams on 2017-11-01.
 */
var express = require("express");
var router = express.Router();
var push = require("./message");
var path = require("path");
var dir = path.join(__dirname,"../push/message");

router.route("/data").post(function (req, res, next) {
    console.log(req.url);
    res.redirect(307,"/push/message");
});

router.post("/push/message",function (req,res,next) {
    push(router, function (err, data) {
        if (err) return console.log("푸시메시지");
        else return console.log("푸시메시지 에러")
    })
});

module.exports = router;