var currentDir = __dirname;
var path=require('path');

var dirOfProject ='';
if(currentDir.indexOf("\\common")>0){
    dirOfProject = currentDir.replace('\\common','');
}else{
    dirOfProject = currentDir.replace('/common','');
}
var currentDirNormalized = path.join(dirOfProject,'\data');

var config ={
    development:{
        connectionString: 'mongodb://localhost:8086/spaStore',
        secret: 'ilovescotchyscotch',
        mongoDbCommand: "mongod --dbpath "+currentDirNormalized+ " --port 8086 --smallfiles",
        herokuDeploy: 'mongodb://vvn050:temppass1@ds127321.mlab.com:27321/heroku_gj7csjsn'
    }, production:{
        connectionString: 'mongodb://localhost:8086/spaStore'
    }, common:{
        host: 'localhost',
        port: 3030
    }
};


module.exports = config;
