/**
 * Created by Ivan on 15/07/15.
 */
/// <reference path="../definitions/node-0.10.d.ts" />

import fs = require('fs');

class Helpers {
    public static readContent(path:string) {
        return fs.readFileSync(__dirname + path, {
            encoding: 'utf8'
        });
    }
}

export = Helpers;
