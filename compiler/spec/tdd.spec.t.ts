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

describe('CITADEL COMPILER', () => {

    it('tests getSourceStrings', () => {
        var compiler = new Compiler(readContent('/spec-02/source.ctdl'));

        expect(compiler.getSourceStrings().length).toBe(2);
    });

    it('tests getSourceStrings', () => {
        var compiler = new Compiler(readContent('/spec-01/source.ctdl'));

        expect(compiler.getSourceObject()).toEqual([{
            type: 'block',
            tag: 'div'
        }]);
    });

});

describe('compiler.parseBlockDeclaration', () => {

    it('block test', () => test({
        source: 'block test',
        result: {
            type: 'block',
            name: 'test',
            tag: null
        }
    }));

    it('BLOCK test', () => test({
        source: 'BLOCK test',
        result: {
            type: 'block',
            name: 'test',
            tag: null
        }
    }));

    it('block test as div', () => test({
        source: 'block test as div',
        result: {
            type: 'block',
            name: 'test',
            tag: 'div'
        }
    }));

    it('block test AS div', () => test({
        source: 'block test AS div',
        result: {
            type: 'block',
            name: 'test',
            tag: 'div'
        }
    }));

    it('  block    test   as   div  ', () => test({
        source: '  block    test   as   div  ',
        result: {
            type: 'block',
            name: 'test',
            tag: 'div'
        }
    }));

    it('block test bla', () => testError({
        source: 'block test bla',
        error: Compiler.Errors.BLOCK_DECLARATION_SYNTAX_ERROR
    }));

    function test(options: {
        source:string;
        result: ItemData;
    }){
        var parse_result: ItemData = Compiler.parseBlockDeclaration(options.source);
        expect(parse_result).toEqual(options.result);
    }

    function testError(options: {
        source:string;
        error: string;
    }){
        expect(() => Compiler.parseBlockDeclaration(options.source)).toThrowError(options.error);
    }
});

describe('Compiler.parseElementDeclaration', () => {

    test({
        source: 'e:',
        result: {
            type: Compiler.ITEM_TYPE.ELEMENT,
            name: null,
            tag: null
        }
    });

    test({
        source: 'e:test',
        result: {
            type: Compiler.ITEM_TYPE.ELEMENT,
            name: 'test',
            tag: null
        }
    });

    test({
        source: 'e:test>a',
        result: {
            type: Compiler.ITEM_TYPE.ELEMENT,
            name: 'test',
            tag: 'a'
        }
    });

    test({
        source: 'e:>a',
        result: {
            type: Compiler.ITEM_TYPE.ELEMENT,
            name: null,
            tag: 'a'
        }
    });

    test({
        source: '  e:   test  > a  ',
        result: {
            type: Compiler.ITEM_TYPE.ELEMENT,
            name: 'test',
            tag: 'a'
        }
    });

    testError({
        source: 'e>test:a',
        error: Compiler.Errors.ELEMENT_DECLARATION_SYNTAX_ERROR
    });

    function test(options:{
        source:string;
        result: ItemData;
    }) {
        it(options.source, () => {
            var parse_result:ItemData = Compiler.parseElementDeclaration(options.source);
            expect(parse_result).toEqual(options.result);
        });
    }

    function testError(options:{
        source:string;
        error: string;
    }) {
        it(options.source, () => {
            expect(() => Compiler.parseElementDeclaration(options.source)).toThrowError(options.error);
        });
    }
});

