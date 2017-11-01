var express = require('express');
var router = express.Router();
var message = require("./message");
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

message(router,function (err,data) {
    if(err) console.log("푸시 에러");
    else console.log(data);
});

module.exports = router;
