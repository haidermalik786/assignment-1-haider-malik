'use strict';
var debug = require('debug');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;
//code bellow is connection to my mongodb 
const uri = "mongodb+srv://haider:123@cluster0.h6bhh.mongodb.net/<dbname>?retryWrites=true&w=majority";
try {
    mongoose.connect(uri, { useNewUrlParser: true });
    var db = mongoose.connection;
    db.on('error', function (err) {
        console.log(err);
    });
    db.once('open', function (callback) {
        console.log('Connected to MongoDB');
    });
} catch (err) {
    console.log("Error : " + err);
}

var routes = require('./routes/index');
var HomePage = require('./routes/HomePage');
var ProjectsPage = require('./routes/ProjectsPage');
var Services = require('./routes/Services');
var ContactMe = require('./routes/ContactMe');
var AboutMe = require('./routes/AboutMe');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/HomePage', HomePage);
app.use('/ProjectsPage', ProjectsPage);
app.use('/Services', Services);
app.use('/ContactMe', ContactMe);
app.use('/AboutMe', AboutMe);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function () {
    debug('Express server listening on port ' + server.address().port);
});
