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
import Serialized = interfaces.Serialized;

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

        this.declaration_parsers[Compiler.ITEM_TYPE.BLOCK] = Compiler.parseBlockDeclaration;
        this.declaration_parsers[Compiler.ITEM_TYPE.ELEMENT] = Compiler.parseElementDeclaration;

        this.declaration_patterns[Compiler.ITEM_TYPE.BLOCK] = /^(:?\s)*b\:.+$/;
        this.declaration_patterns[Compiler.ITEM_TYPE.ELEMENT] = /^(:?\s)*e\:.+$/;

        this.buildTree();
    }

    public getSCSS():string {
        return this.renderToSCSS(this.getSourceObject()).replace(/{BLOCK}_/g, '');
    }

    public getHTML():string {
        return null;
    }

    private renderToSCSS(item:Serialized<ItemData>):string {
        var scss:string = Compiler.renderSCSSTemplate(item),
            children_scss:string[] = [],
            children_scss_string:string;

        _.each(item.children, (child) => {
            children_scss.push(this.renderToSCSS(child));
        });

        if(item.data) {
            children_scss_string =_.map(children_scss.join('\n').split('\n'), (str:string) => {
                return str && ('  ' + str);
            }).join('\n');
        } else {
            children_scss_string = children_scss.join('\n\n');
        }

        if(item.data && item.data.type === Compiler.ITEM_TYPE.BLOCK) {
            children_scss_string = children_scss_string.replace(/{BLOCK}/g, item.data.name);
        }

        return scss.replace('{CHILDREN}', children_scss_string);
    }

    private static renderSCSSTemplate(item:Serialized<ItemData>):string {
        var template:string,
            name:string;

        if(item.data) {
            template = '{name} {\n{CHILDREN}\n}';
            name = Compiler.compileElementName(item);

            return template.replace('{name}', name);
        } else {
            return '{CHILDREN}';
        }
    }

    private static compileElementName(item:Serialized<ItemData>):string{
        var name:string = '',
            data:ItemData = item.data;

        if(data.type === Compiler.ITEM_TYPE.ELEMENT) {
            if(data.name){
                name = (data.tag || '') + '.{BLOCK}_' + data.name;
            } else {
                name = '& > ' + data.tag;
            }
        } else if(data.type === Compiler.ITEM_TYPE.BLOCK) {
            name = '.block-' + data.name;
        }

        return name;
    }

    private buildTree():void {
        _.each(this.source_strings, (line:string, index:number) => {
            var declaration_type:string = null;

            if(!line.trim()){
                return;
            }

            _.each(this.declaration_patterns, (pattern, type) => {
                if(pattern.test(line)) {
                    declaration_type = type;
                }
            });

            if(declaration_type) {
                this.tree.upTo(Compiler.parseLevel(line));
                this.tree.add(this.declaration_parsers[declaration_type](line));
            } else {
                throw new Error('Unnable to parse code at line: ' + index + ':' + line);
            }
        });
    }

    public getSourceStrings():string[] {
        return this.source_strings;
    }

    public getSourceObject():Serialized<ItemData> {
        return this.tree.serialize();
    }

    public static parseLevel(str:string):number {
        var matches = str.match(/^(\s*)/),
            space_length = matches ? matches[1] && matches[1].length : 0,
            delta = space_length % 4,
            count = Math.floor(space_length/4);

        return delta ? count + 1 : count ;
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
    private tree:Tree<ItemData> = new Tree<ItemData>();
    private declaration_patterns:_.Dictionary<RegExp> = {};
    private declaration_parsers:_.Dictionary<(string)=>ItemData> = {};
}

export = Compiler;
