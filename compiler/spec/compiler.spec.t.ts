/**
 * Created by Ivan on 15/07/15.
 */
/// <reference path="../definitions/jasmine.d.ts" />
/// <reference path="../definitions/node-0.10.d.ts" />

import fs = require('fs');
import interfaces = require('../compiler.i');
import Compiler = require('../compiler.t');
import Helpers = require('./helpers.t');

import ItemData = interfaces.ItemData;
import IItem = interfaces.IItem;

var readContent = Helpers.readContent;


describe('compiler.getHTML', () => {
    it('compiler.getHTML', () => {
        var compiler = new Compiler(readContent('/sources/html_compiler.compile.ctdl')),
            result = readContent('/sources/html_compiler.compile.result.html');

        expect(compiler.getHTML()).toBe(result);
    });
});

describe('compiler.getSCSS', () => {

    it('compiler.getSCSS', () => {
        var compiler = new Compiler(readContent('/sources/scss_compiler.compile.ctdl')),
            result = readContent('/sources/scss_compiler.compile.result.scss');

        expect(compiler.getSCSS()).toBe(result);
    });

});

