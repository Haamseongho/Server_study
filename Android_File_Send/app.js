var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var port = process.env.PORT || 3000;

var app = express();
/*
Router
 */
var albumRouter = require("./routes/album");
var fileRouter = require("./routes/file_management");
/*
 DB
 */
var mongoose = require("mongoose");
var db = mongoose.connection;
var dbUrl = "mongodb://hanium_frontier:123123@ds161630.mlab.com:61630/hanium_frontier";
var promise = mongoose.connect(dbUrl, {
    useMongoClient: true
});

promise.then(function (db) {
    console.log("db connection well");
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('port', port);
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use("/",fileRouter);
app.use("/album",albumRouter);



// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
var http = require("http");
var server = http.createServer(app);
/*app.listen(port,function(){
 console.log("server is running on" + port);
 });*/

server.listen(app.get('port'), function () {
    console.log('Express server listening on port:' + app.get('port') + " ");
});


module.exports = app;
