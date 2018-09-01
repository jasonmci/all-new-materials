"use strict";
exports.__esModule = true;
var fs = require("fs");
var webdriver = require("selenium-webdriver");
var chai_1 = require("chai");
chai_1.should();
// skipping this test run until configuring headless chrome for travis CI
describe.skip('Testing...Selenium Demo Test Suite', function () {
    var driver;
    // time out for test execution
    this.timeout(60000);
    before(function () {
        // initializing chrome driver
        driver = new webdriver.Builder()
            .withCapabilities(webdriver.Capabilities.chrome())
            .build();
        // maximizing chrome browser
        driver.manage().window().maximize();
        console.log("hey wait a minute");
    });
    afterEach(function () {
        var testCaseName = this.currentTest.title;
        var testCaseStatus = this.currentTest.state;
        if (testCaseStatus === 'failed') {
            console.log("Test: " + testCaseName + ", Status: Failed!");
            // capturing screenshot if test fails
            driver.takeScreenshot().then(function (data) {
                var screenshotPath = "TestResults/Screenshots/" + testCaseName + ".png";
                console.log("Saving Screenshot as: " + screenshotPath);
                fs.writeFileSync(screenshotPath, data, 'base64');
            });
        }
        else if (testCaseStatus === 'passed') {
            console.log("Test: " + testCaseName + ", Status: Passed!");
        }
        else {
            console.log("Test: " + testCaseName + ", Status: Unknown!");
        }
    });
    after(function () {
        driver.quit();
    });
    it('should fail to open google.com', function () {
        var Url = "http://www.bing.com";
        return driver.get(Url).then(function () {
            console.log("Page \"" + Url + "\" opened");
        }).then(function () {
            return driver.getCurrentUrl().then(function (currentUrl) {
                currentUrl.should.include("www.google.com", "Expected url: www.google.com, Actual url: " + currentUrl);
            });
        });
    });
    it('should fail to search for nilay shah at bing.com', function () {
        var Url = "http://www.bing.com";
        return driver.get(Url).then(function () {
            console.log("Page \"" + Url + "\" opened");
        }).then(function () {
            return driver.getCurrentUrl().then(function (currentUrl) {
                currentUrl.should.include("www.bing.com", "Expected url: www.google.com, Actual url: " + currentUrl);
            }).then(function () {
                var searchBox = driver.findElement(webdriver.By.name('q'));
                searchBox.sendKeys('nilay');
                return searchBox.getAttribute('value').then(function (value) {
                    value.should.equal('nilay shah');
                });
            });
        });
    });
    it('should search for nilay shah at bing.com', function () {
        var Url = "http://www.bing.com";
        return driver.get(Url).then(function () {
            console.log("Page \"" + Url + "\" opened");
        }).then(function () {
            return driver.getCurrentUrl().then(function (currentUrl) {
                currentUrl.should.include("www.bing.com", "Expected url: www.bing.com, Actual url: " + currentUrl);
            }).then(function () {
                var searchBox = driver.findElement(webdriver.By.name('q'));
                searchBox.sendKeys('nilay shah');
                return searchBox.getAttribute('value').then(function (value) {
                    value.should.equal('nilay shah');
                });
            });
        });
    });
});
