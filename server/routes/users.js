var express = require('express');
var router = express.Router();
var _ = require('lodash');
const { ObjectID } = require('mongodb');

var User = require('../models/user');

router.post('/', (req, res, next) => {
    var body = _.pick(req.body, ['firstName', 'lastName', 'password', 'email']);
    var user = new User(body);

    user.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
    
});

router.get('/', (req, res) => {
    User.find().then((users) => {
        res.send( users )
    }, (e) => {
        res.statusCode(400).send(e);
    });
})

module.exports = router;