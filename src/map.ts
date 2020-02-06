/**
 * @author WMXPY
 * @namespace Note_Map
 * @description Map
 */

import { randomUnique } from "@sudoo/random";

export class NoteMap<T extends any> {

    public static create<T extends any = any>() {

        return new NoteMap<T>();
    }

    private readonly _supportMap: Map<string, string[]>;
    private readonly _identifierMap: Map<string, T>;

    private constructor() {

        this._supportMap = new Map<string, string[]>();
        this._identifierMap = new Map<string, T>();
    }

    public setAndGetIdentifer(key: string, value: T): string {

        const identifier: string = randomUnique();
        this._addSupport(key, identifier);
        this._addInstance(identifier, value);
        return identifier;
    }

    public get(key: string): T[] {

        const identifers: string[] = this._getIdentifiers(key);
        return this._getInstances(identifers);
    }

    private _addSupport(key: string, identifier: string): this {

        if (this._supportMap.has(key)) {
            const list: string[] = this._supportMap.get(key);
            this._supportMap.set(key, [...list, identifier]);
        } else {
            this._supportMap.set(key, [identifier]);
        }
        return this;
    }

    private _getIdentifiers(key: string): string[] {

        const identifers: string[] | undefined = this._supportMap.get(key);
        return identifers ?? [];
    }

    private _addInstance(identifier: string, value: T): this {

        this._identifierMap.set(identifier, value);
        return this;
    }

    private _getInstances(identifers: string[]): T[] {

        const result: T[] = [];
        for (const identifer of identifers) {
            const value: T | undefined = this._identifierMap.get(identifer);
            if (typeof value !== 'undefined') {
                result.push(value);
            }
        }

        return result;
    }
}
