/**
 * Created by Ivan on 18/07/15.
 */

import _ = require('underscore');
import interfaces = require('./compiler.i');
import enums = require('./compiler.e');

import ICompiler = interfaces.ICompiler;
import ItemData = interfaces.ItemData;
import Serialized = interfaces.Serialized;
import TYPES = enums.TYPES

class Compiler implements ICompiler<string> {

    constructor(data:Serialized<ItemData>) {
        this.html = this.renderToHTML(data);
    }

    public compile():string {
        return this.html;
    }

    private renderToHTML(item:Serialized<ItemData>):string {
        return null;
    }

    private html:string;
}

export = Compiler;

