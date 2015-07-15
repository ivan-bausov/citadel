/**
 * Created by Ivan on 15/07/15.
 */
/// <reference path="./definitions/node-0.10.d.ts" />
/// <reference path="./definitions/node-0.10.d.ts" />
/// <reference path="./definitions/underscore.d.ts" />

import fs = require('fs');
import _ = require('underscore');
import interfaces = require('./compiler.i');
import Tree = require('./tree.t');

import IItem = interfaces.IItem;
import ItemData = interfaces.ItemData;

var ERRORS = {
    BLOCK_DECLARATION_SYNTAX_ERROR: "BLOCK declaration syntax error",
    ELEMENT_DECLARATION_SYNTAX_ERROR: "ELEMENT declaration syntax error"
};

var TYPES = {
    ELEMENT: 'element',
    BLOCK: 'block'
};

class Compiler {

    static Errors = ERRORS;
    static ITEM_TYPE = TYPES;

    constructor(private source_code:string) {
        this.source_strings = source_code.split('\n');

        this.declaration_parsers = {
            'block': (line:string) => Compiler.parseBlockDeclaration(line)
        };
    }

    public scss():string {
        return null;
    }

    public html():string {
        return null;
    }

    private calculateSourceObject():void {
        _.each(this.source_strings, (line:string, index:number) => {
            var declaration_type = null;
            _.each(this.declaration_patterns, (pattern, type) => {
                if(pattern.test(line)) {
                    declaration_type = type;
                }
            });

            if(declaration_type) {

            } else {
                throw new Error('Unnable to parse code at line: ' + index);
            }

        });
    }

    public getSourceStrings():string[] {
        return this.source_strings;
    }

    public getSourceObject():any {
        return this.source_object;
    }

    public static parseBlockDeclaration(line:string):ItemData{
        return Compiler.parseDeclaration(
            line,
            /^\s*b\:\s*([^>\s]+)(:?\s*>\s*(\S+))?\s*$/,
            Compiler.ITEM_TYPE.BLOCK,
            Compiler.Errors.BLOCK_DECLARATION_SYNTAX_ERROR
        );
    }

    public static parseElementDeclaration(line:string):ItemData{
        return Compiler.parseDeclaration(
            line,
            /^\s*e\:\s*([^>\s]+)?(:?\s*>\s*(\S+))?\s*$/,
            Compiler.ITEM_TYPE.ELEMENT,
            Compiler.Errors.ELEMENT_DECLARATION_SYNTAX_ERROR
        );
    }

    public static parseDeclaration(line:string, pattern:RegExp, item_type:string, error_message:string):ItemData{
        var matches = line.match(pattern),
            item_data:ItemData = null;

        if(matches) {
            item_data = {
                type: item_type,
                name: matches[1] || null,
                tag: matches[3] || null
            };
        } else {
            throw Error(error_message);
        }

        return item_data;
    }

    private source_strings:string[] = [];
    private source_object:any = [];
    private tree:Tree<ItemData> = new Tree<ItemData>();
    private declaration_patterns:_.Dictionary<RegExp> = {
      'block': /.?block.+/
    };
    private declaration_parsers:_.Dictionary<(string)=>void>;
}

export = Compiler;
