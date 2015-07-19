/**
 * Created by Ivan on 15/07/15.
 */
/// <reference path="./definitions/node-0.10.d.ts" />
/// <reference path="./definitions/node-0.10.d.ts" />
/// <reference path="./definitions/underscore.d.ts" />

import interfaces = require('./compiler.i');
import enums = require('./compiler.e');
import StructCompiler = require('./struct_compiler.t');
import ScssCompiler = require('./scss_compiler.t');
import HtmlCompiler = require('./html_compiler.t');

import ItemData = interfaces.ItemData;
import Serialized = interfaces.Serialized;
import TYPES = enums.TYPES;

class Compiler {

    static ITEM_TYPE = TYPES;

    constructor(private source_code:string) {
        this.source_object = new StructCompiler(source_code).compile();
    }

    public getSCSS():string {
        return new ScssCompiler(this.source_object).compile();
    }

    public getHTML():string {
        return new HtmlCompiler(this.source_object).compile();
    }

    private source_object: Serialized<ItemData>;
}

export = Compiler;
