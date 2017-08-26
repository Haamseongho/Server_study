/**
 * Created by haams on 2017-08-26.
 */
var express = require("express");
var router = express.Router();
var Album = require("../models/albumDB");

router.post("/upload", function (req, res, next) {

    var memo_title1 = req.body.title[0];
    var memo_title2 = req.body.title[1];
    var memo1 = req.body.memo1;
    var memo2 = req.body.memo2;
    var imgPath1 = req.body.imagePath1;
    var imgPath2 = req.body.imagePath2;

    console.log(memo_title1 + "/" + memo1 + '/' + imgPath1 + "////" + "/" + memo_title2 + " / " + memo2 + "/" + imgPath2);
});
module.exports = router;


/*
 url : /album/upload --> 앨범 보내기 / 현재 구조는 앨범에 메모 스키마 추가해서 작업 (memo)
 */