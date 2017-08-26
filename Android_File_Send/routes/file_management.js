/**
 * Created by haams on 2017-08-21.
 */
var express = require("express");
var router = express.Router();
var Files = require("../models/fileDB");
var FileList = require("../models/fileListDB");
var multer = require("multer");

var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, 'uploads/');
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    }
});

var upload = multer({storage: storage}).single('file');


router.get("/file/upload", function (req, res, next) {
    res.render("main");
});

router.post("/file/upload", function (req, res, next) {
    var title = req.body.memoTitle;
    var memo = req.body.momoContent;
    var imageUrl = req.body.memoImagePath;
    console.log(title + "//" + memo + "///" + imageUrl);
    Files.fileUpload(title, memo, imageUrl, function (err, file) {
        if (err) return console.log("파일 업로드 실패");
        else {
            console.log("파일 업로드 성공");
            res.status(200).json(file);
        }
    })
});

router.post("/fileList/upload", upload, function (req, res, next) {
    var diary_k = req.body.diary_k;
    var title = req.body.title;
    var memo = req.body.memo;

    var upFile = req.file;
    var fileList = new FileList();
    fileList.insert({diary_k: diary_k, title: title, memo: memo, upFile: upFile}, function (err, file) {
        if (err) return console.log("파일 업로드 실패");
        else {
            res.status(200).json(file);
        }
    })
});

module.exports = router;
