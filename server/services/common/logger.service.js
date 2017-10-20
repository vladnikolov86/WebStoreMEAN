var fs = require('fs');

const defaultOptions = {
    storagePath: __dirname + '/logs',
    logType: 'day'
};

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

function checkIfFileExists(config) {
   //get the file name in this case date  var fileName = 
    switch (config.logType) {
        case 'day':
        
        
        break;
        default: console.log('Not supported, yet!');
            break;
    }

    fs.existsSync(dirPath)
}

module.exports = function (options) {
    if (!options) {
        options = JSON.parse(JSON.stringify(defaultOptions));
    }

    return function (req, res, next) {
        req
            .on("end", async function () {
                console.log(options)
                await checkDirectory(options.storagePath, function (result) {
                    console.log('there')
                }, function () {
                    console.log('err')
                });
                console.log('here')
                //console.log(res)
                next()
            });
        next()
    }
}