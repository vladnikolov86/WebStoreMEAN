var express = require('express'),
    bodyParser = require('body-parser'),
    path = require('path');

var constants = require('./common/constants');

var env = process.env.NODE_ENV || 'development';
var app = express();


//Set path for all public resources
app.use(express.static(__dirname + '/public/dist'));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//Internal for the app
app.get('/api/main1', function (req, res) {
    var requestHost = req.get('host');
    
    res.send({proba: 'test'});

});

app.get('/api/brands', require('./server/controllers/admin.controller'));

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/dist/index.html'));
});

app.listen(constants.port);
console.log('Server started on port ' + constants.port);

