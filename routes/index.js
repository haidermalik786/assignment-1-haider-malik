'use strict';
var express = require('express');
var router = express.Router();
var infoModel = require('../models/database');

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', { title: 'WebPage' });
});
// the only file that is not created in app.js
router.get('/insert', function (req, res) {
    res.render('insert');
});

router.post('/insert', function (req, res) {
    //Create a new article using the Articles Model Schema
    const database = new infoModel({ name: req.body.name, description: req.body.description });
    //Insert article into DB
    database.save(function (err) {
        console.log('INSERTING');
        res.redirect('/');
    });
});


module.exports = router;