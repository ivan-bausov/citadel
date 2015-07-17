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
        this.scss = this.renderToSCSS(data);
    }

    public compile():string {
        return this.scss;
    }


    private renderToSCSS(item:Serialized<ItemData>):string {
        var scss:string = Compiler.renderSCSSTemplate(item),
            children_scss:string[] = [],
            children_scss_string:string;

        _.each(item.children, (child) => {
            children_scss.push(this.renderToSCSS(child));
        });

        if (item.data) {
            children_scss_string = _.map(children_scss.join('\n').split('\n'), (str:string) => {
                return str && ('  ' + str);
            }).join('\n');
        } else {
            children_scss_string = children_scss.join('\n\n');
        }

        if (item.data && item.data.type === TYPES.BLOCK) {
            children_scss_string = children_scss_string.replace(/{BLOCK}/g, item.data.name);
        }

        return scss.replace('{CHILDREN}', children_scss_string);
    }

    private static renderSCSSTemplate(item:Serialized<ItemData>):string {
        var template:string,
            name:string;

        if (item.data) {
            template = '{name} {\n{CHILDREN}\n}';
            name = Compiler.compileElementName(item);

            return template.replace('{name}', name);
        } else {
            return '{CHILDREN}';
        }
    }

    private static compileElementName(item:Serialized<ItemData>):string {
        var name:string = '',
            data:ItemData = item.data;

        if (data.type === TYPES.ELEMENT) {
            if (data.name) {
                name = (data.tag || '') + '.{BLOCK}_' + data.name;
            } else {
                name = '& > ' + data.tag;
            }
        } else if (data.type === TYPES.BLOCK) {
            name = '.block-' + data.name;
        }

        return name;
    }

    private scss:string;
}

export = Compiler;
