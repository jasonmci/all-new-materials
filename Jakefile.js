/*global desc, task, jake, fail, complete */
"use strict";

desc("Build and Test");
task("default", ["lint"]);

desc("Lint all the things");
task("lint", [], function() {
    var lint = require("./build/lint/lint_runner.js");
    var files = new jake.FileList();
    files.include("**/*.js");
    files.exclude("node_modules");

    var passed = lint.validateFileList(files.toArray(), nodeLintOptions(), {});
    if (!passed) fail("Lint failed")
});

desc("integrate");
task("integrate", ["default"], function() {
    console.log("1. Make sure 'git status' is clean");
    console.log("2. Build in the integration box");
    console.log("   a. Walk over to the integration box.");
    console.log("   b. 'git pull'");
    console.log("   c 'jake'");
    console.log("   d. If jake fails, stop and start over.");
    console.log("3. 'git checkout integration");
    console.log("4. 'git merge master --no-ff --log");
    console.log("5. 'git checkout master");
});

function nodeLintOptions() {
    return {
        bitwise: true,
        curly: false,
        eqeqeq: true,
        forin: true,
        immed: true,
        latedef: false,
        newcap: true,
        noarg: true,
        noempty: true,
        nonew: true,
        regexp: true,
        undef: true,
        strict: true,
        trailing: true,
        node: true
    };
}

