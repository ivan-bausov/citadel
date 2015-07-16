/**
 * Created by Ivan on 15/07/15.
 */

import interfaces = require('./compiler.i');

import ILeaf = interfaces.IItem;

class Item<T> implements ILeaf<T>{
    constructor(private parent: Item<T>, private data:T) {
    }

    public getParent():Item<T>{
        return this.parent;
    }

    public getInfo():T{
        return this.data;
    }

    public getChildren():Item<T>[]{
        return this.childs;
    }

    public addChild(item_data:T):Item<T>{
        var child:Item<T> = new Item<T>(this, item_data);
        this.childs.push(child);
        return child;
    }

    private childs:Item<T>[] = [];
}

class Tree<T> {
    constructor() {
    }

    public add(leaf_data:T):void{
        this.current_leaf = this.current_leaf.addChild(leaf_data);
    }

    public get():ILeaf<T>{
        return this.current_leaf;
    }

    public up():void {
        this.current_leaf = this.current_leaf.getParent() || this.current_leaf;
    }

    public upTo(level:number):void {
        while(this.level() > level) {
            this.up();
        }
    }

    public level():number {
        var level:number = 0,
            item:Item<T> = this.current_leaf;

        while(item = item.getParent()){
            level++
        }

        return level;
    }

    private current_leaf: Item<T> = new Item<T>(null, null);
}

export = Tree;