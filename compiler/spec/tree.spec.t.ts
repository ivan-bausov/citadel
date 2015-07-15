/**
 * Created by Ivan on 15/07/15.
 */
/// <reference path="../definitions/jasmine.d.ts" />
/// <reference path="../definitions/node-0.10.d.ts" />

import interfaces = require('../compiler.i');
import Tree = require('../tree.t');

import ItemData = interfaces.ItemData;
import IItem = interfaces.IItem;

describe('Tree', () => {

    beforeAll(() => {
        this.tree = new Tree<number>();
    });

    it('returns null on initialize', () => {
        expect(this.tree.get()).toBe(null);
    });

    it('first add sets root Item', () => {
        this.tree.add(1);

        expect(this.tree.get().getInfo()).toBe(1);
        expect(this.tree.get().getParent()).toBe(null);
    });

    it('first add sets active item', () => {
        this.tree.add(1);
        this.tree.add(2);

        expect(this.tree.get().getInfo()).toBe(2);
        expect(this.tree.get().getParent().getInfo()).toBe(1);
    });

    it('up', () => {
        this.tree.add(1);
        this.tree.add(2);
        this.tree.add(3);

        expect(this.tree.get().getInfo()).toBe(3);

        this.tree.up();

        expect(this.tree.get().getInfo()).toBe(2);
    });

    it('up for root item', () => {
        this.tree.add(1);
        this.tree.up();
        expect(this.tree.get().getInfo()).toBe(1);
    });

});

