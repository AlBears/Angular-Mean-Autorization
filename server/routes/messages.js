var express = require('express');
var router = express.Router();
var _ = require('lodash');
const { ObjectID } = require('mongodb');
var jwt = require('jsonwebtoken');

var Message = require('../models/message');

var { authenticate } = require('../middleware/authenticate');

router.get('/', (req, res) => {
    Message.find().populate('user', 'firstName').then((messages) => {
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
    var userId = req.user._id;
    var body = _.pick(req.body, 'content');

    if (!ObjectID.isValid(id)){
    return res.status(404).send();
     }

    Message.findOneAndUpdate({_id: id, user: userId}, { $set: body }, { new: true }).then((message) => {
        if (!message) {
            return res.status(404).send("You can't update messages, created by other users");
        }

        res.send({ text: 'Message updated successfully', message });
    }).catch((e) => {
        res.status(400).send();
    });
});

router.delete('/:id', authenticate, (req, res) => {
    var id = req.params.id;
    var userId = req.user._id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Message.findOneAndRemove({_id:id, user: userId}).then((message) => {
        if (!message) {
            return res.status(404).send("You can't remove messages, created by other users");
        }

        res.send(message);
    }).catch((e) => {
        res.status(400).send(e);
    });
});


module.exports = router;