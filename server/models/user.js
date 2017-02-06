var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var validator = require('validator');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');


var schema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email'
        }
    },
    messages: [{
        type: Schema.Types.ObjectId,
        ref: 'Message'
    }]
});

schema.statics.findByCredentials = function (email, password) {
    var User = this;

    return User.findOne({ email }).then((user) => {
        if (!user) {
            return Promise.reject('User with provided email does not exist');
        }

        return new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, (err, res) => {
                if (res) {
                    resolve(user);
                } else {
                    reject('Your password is incorrect. Please try again!');
                }
            });
        })
    })
};

schema.methods.generateToken = function () {
    const user = this;
    const token = jwt.sign({ user }, 'secret', { expiresIn: 7200 });
    if (token)
    return Promise.resolve(token);
    
};

schema.pre('save', function(next) {
    var user = this;

    if (user.isModified('password')) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash;
                next();
            });
        });
    } else {
        next();
    }
})

module.exports = mongoose.model('User', schema);