"use strict";
exports.__esModule = true;
var chai_1 = require("chai");
var HelloWorld_1 = require("./HelloWorld");
chai_1.should();
describe('Hello World test suite', function () {
    it('Can say Hello World', function () {
        var result = new HelloWorld_1.HelloWorld().helloWorld();
        result.should.equals('Hello World', "Should return: Hello World, but returned: " + result);
    });
});
