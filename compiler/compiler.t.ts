/**
 * Created by Ivan on 15/07/15.
 */
/// <reference path="./definitions/node-0.10.d.ts" />
/// <reference path="./definitions/node-0.10.d.ts" />
/// <reference path="./definitions/underscore.d.ts" />

import fs = require('fs');
import _ = require('underscore');

interface ItemData {
    type:string;
    tag:string;
}

class Item {
    constructor(private parent: Item, private data:ItemData) {
    }

    public getParent():Item{
        return this.parent;
    }

    public getData():ItemData{
        return this.data;
    }

    public getChilds():Item[]{
        return this.childs;
    }

    public addChild(item:Item):void{
        this.childs.push(item);
    }

    private childs:Item[] = [];
}

class Compiler {

    constructor(private source_code:string) {
        this.source_strings = source_code.split('\n');

        this.declaration_parsers = {
            'block': (line:string) => this.parseBlockDeclaration(line)
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

    private parseBlockDeclaration(line:string){

    }

    private source_strings:string[] = [];
    private source_object:any = [];
    private current:Item = new Item(null, null);
    private declaration_patterns:_.Dictionary<RegExp> = {
      'block': /.?block.+/
    };
    private declaration_parsers:_.Dictionary<(string)=>void>;
}

export = Compiler;
