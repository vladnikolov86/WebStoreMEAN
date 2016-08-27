var express = require('express'),
    bodyParser = require('body-parser');

var constants = require('./common/constants');

var env = process.env.NODE_ENV || 'development';
var app = express();

//Server configuration
require('./server/config/config')(app);

//start database
require('./server/config/mongoose')(constants, env);

//routes
//require('./server/config/routes')(app);


app.listen(constants.common.port);
console.log('Server started on port ' + constants.common.port);

