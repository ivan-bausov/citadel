/**
 * Created by Ivan on 15/07/15.
 */
/// <reference path="../definitions/jasmine.d.ts" />
/// <reference path="../definitions/node-0.10.d.ts" />

import fs = require('fs');
import Compiler = require('../compiler.t');
import Helpers = require('./helpers.t');

var readContent = Helpers.readContent;

//describe('CITADEL COMPILER', () => {
//
//    it('tests simple element declare', () => {
//        var html_result = readContent('/spec-01/result.html'),
//            compiler = new Compiler(readContent('/spec-01/source.ctdl'));
//
//        expect(compiler.scss()).toBe(html_result);
//    });
//
//});

