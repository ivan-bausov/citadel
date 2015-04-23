#!/usr/bin/env node

'use strict';
var ncp = require('ncp').ncp,
    child_process = require('child_process'),
    destination = process.cwd(),
    source = __dirname + '/template';

process.title = 'citadel';

console.log('Init CITADEL template in ' + destination + ' from ' + source);

ncp(source, destination, function (err) {
    if (err) {
        return console.error(err);
    }
    console.log('File copy done');
    console.log('Git init start:');
    child_process.exec('git init', function (error, stdout, stderr) {
        if (error !== null) {
            console.log('exec error: ' + error);
        } else {
            console.log('stdout: ' + stdout);
            console.log('stderr: ' + stderr);
            console.log('Git init done');
            console.log('Npm install start');
            child_process.exec('npm install', function (error, stdout, stderr) {
                if (error !== null) {
                    console.log('exec error: ' + error);
                } else {
                    console.log('stdout: ' + stdout);
                    console.log('stderr: ' + stderr);
                    console.log('Npm install done');
                }
            });
        }
    });
});
