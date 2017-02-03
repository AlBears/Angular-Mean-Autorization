var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

var index = require('./routes/index');
var messages = require('./routes/messages');
var users = require('./routes/users');

var app = express();
mongoose.connect('localhost:27017/node-angular');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(express.static(path.join(__dirname, '..', 'client')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


app.use('/messages', messages);
app.use('/', index);
//app.use('/users', users);

app.listen(3000, function(){
    console.log('Server started on port 3000');
});