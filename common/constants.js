var currentHost = {
    host: 'localhost',
    port: 3030
};
currentHost.allHost = currentHost.host + ':' + currentHost.port;

module.exports = currentHost;