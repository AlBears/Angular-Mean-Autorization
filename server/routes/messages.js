var express = require('express');
var router = express.Router();
var _ = require('lodash');
const { ObjectID } = require('mongodb');
var jwt = require('jsonwebtoken');

var Message = require('../models/message');

var { authenticate } = require('../middleware/authenticate');

router.get('/', (req, res) => {
    Message.find().then((messages) => {
        res.send({ messages });
    }, (e) => {
        res.status(400).send(e);
    })
});

router.post('/', authenticate, (req, res, next) => {
    var message = new Message({
        content: req.body.content,
        user: req.user
    });

    message.save().then((result) => {
        res.status(201).json({ 
            message: 'Saved message',
            obj: result
        });
    }, (e) => {
        res.status(400).send(e);
    });

});

router.patch('/:id', authenticate, (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, 'content');

    if (!ObjectID.isValid(id)){
    return res.status(404).send();
     }

    Message.findByIdAndUpdate(id, { $set: body }, { new: true }).then((message) => {
        if (!message) {
            return res.status(404).send();
        }

        res.send({ text: 'Message updated successfully', message });
    }).catch((e) => {
        res.status(400).send();
    });
});

router.delete('/:id', authenticate, (req, res) => {
    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Message.findByIdAndRemove(id).then((message) => {
        if (!message) {
            return res.status(404).send();
        }

        res.send(message);
    }).catch((e) => {
        res.status(400).send(e);
    });
});


module.exports = router;