// tdjs tutorials
"use strict";

var http = require("http");
var server; 

exports.start = function(portNumber) {
    // var portNumber = 8080;
    server = http.createServer();
    server.on("request", function(request, response) {
        response.end("Hello World");
    });
    server.listen(portNumber); // TODO: remove duplication of the port number
};

exports.stop = function(callback) {
    server.close(callback); 
}; 
