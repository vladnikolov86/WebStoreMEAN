var config ={
    development:{
        connectionString: 'mongodb://localhost:8086/spaStore',
        secret: 'ilovescotchyscotch'
    }, production:{
        connectionString: 'mongodb://dasdasdas'
    }, common:{
        host: 'localhost',
        port: 3030
    }
};


module.exports = config;
