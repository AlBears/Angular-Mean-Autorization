var express = require('express');
var router = express.Router();

var Message = require('../models/message');

router.post('/', (req, res, next) => {
    var message = new Message({
        content: req.body.content
    });

    message.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});

router.get('/', (req, res) => {
    Message.find().then((messages) => {
        res.send({ messages });
    }, (e) => {
        res.status(400).send(e);
    })
});


module.exports = router;