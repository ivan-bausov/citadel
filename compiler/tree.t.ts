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
        if(this.current) {
            this.current = this.current.addChild(leaf_data);
        } else {
            this.current = new Item<T>(null, leaf_data);
        }
    }

    public get():ILeaf<T>{
        return this.current;
    }

    public up():void {
        this.current = this.current.getParent() || this.current;
    }

    private current: Item<T> = null;
}

export = Tree;