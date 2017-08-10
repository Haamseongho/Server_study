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
    var cr_name = req.query.cr_name;
    console.log(cr_name);
    getFileFromServer(cr_name, function (err, file) {
        if (err) return console.log(new Error("Load File Error"));
        console.log(JSON.stringify(file.upFile));
        //res.status(200).render("board.ejs",{cr_name : cr_name , file_info : file});
        /* fs.readFile(path.join(__dirname,file.path),"utf-8",function (err,data) {
         if(err) return console.log("파일 데이터 불러오기 실패");
         return console.log(data);
         })*/
    });
    /*   readFileFromServer(file,function (err) {
     if(err) return console.log("파일 읽기 실패");
     });*/
    res.status(200).json(cr_name);
});

function getFileFromServer(name, callback) {
    Files.collection.findOne({cr_name: name}, callback)
};



module.exports = router;