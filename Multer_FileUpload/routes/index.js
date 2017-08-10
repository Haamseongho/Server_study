var express = require('express');
var router = express.Router();
var expressSession = require("express-session");
var multer = require("multer");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var fs = require("fs");
var Files = require("../models/fileDB");

var db = require("mongodb").MongoClient;

router.use(bodyParser.urlencoded({extended: true}));


router.use(cookieParser());

router.use(expressSession({
    secret: 'abcde',
    resave: true,
    saveUninitialized: true
}));
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});



var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, 'uploads/');
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    }
});

var upload = multer({storage: storage}).single('file');


router.post("/process/file", upload, function (req, res, next) {
    console.log(req.file);
    var cr_name = req.body.cr_name;
    var upFile = req.file;


  /*
   파일 업로드
   */
    // DB save

    Files.collection.insert({cr_name: cr_name, created_at: Date.now(), upFile: upFile}, function (err, file) {
        if (err) return next(err);
        else {
            console.log("insert file well");
            res.status(200).render("main");
        }
    })
});

module.exports = router;