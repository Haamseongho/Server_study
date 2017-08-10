/**
 * Created by haams on 2017-07-21.
 */
var express = require("express");
var router = express.Router();
var fs = require("fs");
var Files = require("../models/fileDB");
var fs = require("fs");
var path = require("path");

router.get("/files", function (req, res, next) {
    var filename = req.query.filename;
    console.log(filename);
    var filePath = path.dirname(__dirname) + "\\uploads";
    console.log(filePath);
    res.download(filePath + "\\" + filename,filePath);
});


module.exports = router;