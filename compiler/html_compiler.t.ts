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
        var html:string = Compiler.renderToHTMLTemplate(item),
            children_html:string[] = [],
            children_html_string:string;

        _.each(item.children, (child) => {
            children_html.push(this.renderToHTML(child));
        });

        if (item.data) {
            children_html_string = _.map(children_html.join('\n').split('\n'), (str:string) => {
                return str && ('    ' + str);
            }).join('\n');
        } else {
            children_html_string = children_html.join('\n');
        }

        if (item.data && item.data.type === TYPES.BLOCK) {
            children_html_string = children_html_string.replace(/{BLOCK}/g, item.data.name);
        }

        children_html_string = children_html_string || '';
        children_html_string = html !== '{CHILDREN}' && children_html_string ? '\n' + children_html_string + '\n' : children_html_string;

        return html.replace('{CHILDREN}', children_html_string);
    }

    private static renderToHTMLTemplate(item:Serialized<ItemData>):string {
        var template:string,
            name:string;

        if (item.data) {
            template = Compiler.TEMPLATES[item.data.tag] || Compiler.TEMPLATES['ANY'];
            name = Compiler.compileItemName(item);
            name = name ? ' class="' + name + '"' : '';

            return template.replace('{name}', name).replace(/{tag}/g, item.data.tag || 'div');
        } else {
            return '{CHILDREN}';
        }
    }

    private static compileItemName(item:Serialized<ItemData>):string {
        var data:ItemData = item.data;

        if(data.type === TYPES.BLOCK) {
            return 'block-' + data.name;
        } else if (data.type === TYPES.ELEMENT) {
            if (data.name) {
                return '{BLOCK}_' + data.name;
            }
        }

        return null;
    }

    private html:string;
    private static TEMPLATES:_.Dictionary<string> = {
        'a': '<a{name} href="#" title="">{CHILDREN}</a>',
        'img': '<img{name} src="" alt=""/>',
        'ANY': '<{tag}{name}>{CHILDREN}</{tag}>'
    };
}

export = Compiler;

