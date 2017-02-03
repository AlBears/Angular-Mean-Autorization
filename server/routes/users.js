var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/user');

router.post('/', (req, res, next) => {
    var user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password,
        email: req.body.email
    });

    user.save();
    res.send('posted')
})

router.get('/', (req, res) => {
    User.find().then((users) => {
        res.send( users )
    }, (e) => {
        res.statusCode(400).send(e);
    });
})

module.exports = router;