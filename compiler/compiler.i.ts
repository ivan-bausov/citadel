/**
 * Created by Ivan on 15/07/15.
 */

export interface ICompiler<TOutput> {
    compile():TOutput;
}

export interface ItemData {
    type:string;
    name:string;
    tag:string;
}

export interface Serialized<T> {
    data: T;
    children: Serialized<T>[];
}

export interface IItem<T> {
    getParent():IItem<T>;
    getChildren():IItem<T>[];
    addChild(item_data:T):IItem<T>;
    getInfo():T;
}

