var currentDir = __dirname;
var dirOfProject = currentDir.replace('\\common','');

var config ={
    development:{
        connectionString: 'mongodb://localhost:8086/spaStore',
        secret: 'ilovescotchyscotch',
        mongoDbCommand: "mongod --dbpath "+dirOfProject+"\\data --port 8086 "
    }, production:{
        connectionString: 'mongodb://dasdasdas'
    }, common:{
        host: 'localhost',
        port: 3030
    }
};


module.exports = config;
