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

describe('compiler.toSCSS', () => {

    it('compiler.toSCSS', () => {
        var compiler = new Compiler(readContent('/sources/compiler.getSCSS.ctdl')),
            result = readContent('/sources/compiler.getSCSS.result.scss');

        expect(compiler.getSCSS()).toBe(result);
    });

});

