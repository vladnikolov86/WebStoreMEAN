var fs = require('fs');



function checkDirectory(directory, callback) {
    fs
        .stat(directory, function (err, stats) {
            if (err) {
                fs.mkdir(directory, callback)
                console.log('not found ---> creating it')
            } else {
                callback(err)
            }
        })
}

module.exports = function (options) {
    return function (req, res, next) {
        req
            .on("end", function () {
                console.log(options)
                checkDirectory(__dirname + '/penis1', function (result) {
                    console.log(result)
                });
                //console.log(res)
                next()
            });
        next()
    }
}