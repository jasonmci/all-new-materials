/*global desc, task, jake, fail, complete */
"use strict";

desc("Build and Test");
task("default", ["lint", "test"]);

desc("Lint all the things");
task("lint", [], function() {
    var lint = require("./build/lint/lint_runner.js");
    var files = new jake.FileList();
    files.include("**/*.js");
    files.exclude("node_modules");
    files.exclude("test");

    var passed = lint.validateFileList(files.toArray(), nodeLintOptions(), {});
    if (!passed) fail("Lint failed");
});

desc("Merge known good to integration branch");
task("mergeToIntegration", [], function() {
    console.log("Now that everything has passed...");
    console.log("1. git checkout integration");
    console.log("2. git merge master --no-ff --log");
    console.log("3. git checkout master");
    var cmds = [
        'git checkout integration',
        'git merge master --no-ff --log',
        'git checkout master'
    ];
    jake.exec(cmds, {printStdout: true}, function() {
        console.log("All changes have been moved to the integration branch.");
        complete();
    });
});

desc("integrate");
task("integrate", ["default"], function() {
    console.log("1. Make sure 'git status' is clean");
    console.log("2. Build in the integration box");
    console.log("   a. Walk over to the integration box.");
    console.log("   b. 'git pull'");
    console.log("   c 'jake'");
    console.log("   d. If jake fails, stop and start over.");
    console.log("3. 'Run 'jake mergeToIntegration'");
});

desc("Test Everything");
task("test", [], function(){
    var reporter = require("nodeunit").reporters["default"];
    reporter.run(['src/server/_server_test.js'], null, function(failures) {
        if (failures) fail("Tests Failed");
        complete();
    });
}, {async: true});


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

