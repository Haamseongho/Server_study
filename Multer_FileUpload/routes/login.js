/**
 * Created by haams on 2017-07-20.
 */
var express = require("express");
var router = express.Router();


router.post("/login",function (req,res,next) {
    var txt = req.body.text;
    console.log(txt);
    res.send(JSON.stringify(txt));
});

module.exports = router;