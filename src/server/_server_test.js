// tdjs tutorials
"use strict";

var PORT = 8080;

var server = require("./server.js");
var http = require("http");

exports.setUp = function(done) {
    server.start(8080);
    done();
};

exports.tearDown = function(done) {
    server.stop(function() {
        done();
    });
};

exports.test_ServerRespondsToGetRequest = function(test) {
    http.get("http://localhost:8080", function(response) {
        response.on("data", function() {} );
        test.done();
    });
};

exports.test_ServerReturnsHelloWorld = function(test) {
    var request = http.get("http://localhost:8080");
    request.on("response", function (response) {
        var receivedData = false;
        response.setEncoding("utf8");
        test.equals(200, response.statusCode, "status code");
        response.on("data", function(chunk){
            receivedData = true;
            test.equals("Hello World", chunk, "this is the expected response" );
        })
        response.on("end", function() {
            test.ok(receivedData, "should have received response");
            test.done();
        } );
    });
};

exports.test_serverRunsCallbackWhenStopCompletes = function(test) {
    server.stop(function() {
        test.done();
    });
    server.start(); //TODO: This is wonky
};
