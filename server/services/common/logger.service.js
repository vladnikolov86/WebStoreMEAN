var fs = require('fs'),
    path = require('path');

const defaultOptions = {
    storagePath: __dirname + '/logs',
    logType: 'day',
    logNameSeparator: '-'
};

var logDirectoryExists = false,
    logFileName = '';

function checkDirectory(directory, callback) {
    return new Promise((resolve, reject) => {
        fs
            .stat(directory, function (err, stats) {
                if (err) {
                    fs.mkdir(directory, callback);
                    resolve();
                    console.log('not found ---> creating it')
                } else {
                    resolve();
                    callback();
                }
            })
    })

}

function getCurrentLogFileName(config) {
    switch (config.logType) {
        case 'day':
            var currentDate = new Date();
            let date = currentDate
                    .getUTCDate()
                    .toString(),
                month = currentDate
                    .getUTCMonth()
                    .toString(),
                year = currentDate
                    .getUTCFullYear()
                    .toString();

            var logNameSeparator = defaultOptions.logNameSeparator;
            return date + logNameSeparator + month + logNameSeparator + year + '.txt';
        default:
            console.log('Not supported, yet!');
            return new Date().toString();

    }

    // fs.existsSync(dirPath)
}

module.exports = function (options) {
    if (!options) {
        options = JSON.parse(JSON.stringify(defaultOptions));
    }

    return async function (req, res, next) {
        //The check should be performed only once, on app initialization
        if (!logDirectoryExists) {
            await checkDirectory(options.storagePath, function (result) {
                console.log('there')
                logDirectoryExists = true;
            }, function () {
                logDirectoryExists = false;
                console.log('err')
            });
        }

        //Check for new day to start a new File
        var currentLogName = getCurrentLogFileName(options);
        if (logFileName.length == 0 || currentLogName !== logFileName) {
            logFileName = currentLogName;
        }

        var logStream = fs.createWriteStream(path.join(options.storagePath + '/') + logFileName, {
            'flags': 'a',
            'encoding': 'UTF8'
        });
        console.log(path.join(options.storagePath) + logFileName)
        console.log(req.message)
        logStream.write("Request headers:" +JSON.stringify(req.headers));
          logStream.write('\r\n');
       //  logStream.write("Response details:");
        logStream.write('\r\n');
        logStream.end(function () {
            console.log('done');
        });

        req.on("end", async function () {
            console.log('here')
            next()
        });
        next()}
}