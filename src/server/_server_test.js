// tdjs tutorials
"use strict";

var server = require("./server.js");
var http = require("http");

exports.tearDown = function(done) {
    server.stop(function() {
        done();
    });
};

exports.test_ServerRespondsToGetRequest = function(test) {
    server.start();
    http.get("http://localhost:8080", function(response) {
        response.on("data", function() {} );
        test.done();
    });
};

exports.test_ServerReturnsHelloWorld = function(test) {
    server.start(); //TODO: Remove duplicate code
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
