/**
 * Created by Ivan on 18/07/15.
 */
/// <reference path="../definitions/jasmine.d.ts" />
/// <reference path="../definitions/node-0.10.d.ts" />

import fs = require('fs');
import interfaces = require('../compiler.i');
import Compiler = require('../html_compiler.t');
import Helpers = require('./helpers.t');

import ItemData = interfaces.ItemData;
import IItem = interfaces.IItem;

var readContent = Helpers.readContent;

