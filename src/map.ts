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

    // Identifier => Key
    private readonly _reverseMap: Map<string, string>;
    // Key => Identifier[]
    private readonly _supportMap: Map<string, string[]>;
    // Identifier => Instance
    private readonly _instanceMap: Map<string, T>;

    private constructor() {

        this._reverseMap = new Map<string, string>();
        this._supportMap = new Map<string, string[]>();
        this._instanceMap = new Map<string, T>();
    }

    public setAndGetIdentifer(key: string, value: T): string {

        const identifier: string = randomUnique();
        this._addSupport(key, identifier);
        this._addInstance(identifier, value);
        return identifier;
    }

    public getInstances(key: string): T[] {

        const identifers: string[] = this._getIdentifiers(key);
        return this._getInstances(identifers);
    }

    public removeByIdentifier(identifier: string): boolean {

        const removeIdentifierResult: boolean = this._removeIdentifier(identifier);
        if (!removeIdentifierResult) {
            return false;
        }
        return this._removeInstance(identifier);
    }

    // SupportMap & ReverseMap
    private _getIdentifiers(key: string): string[] {

        const identifers: string[] | undefined = this._supportMap.get(key);
        return identifers ?? [];
    }

    private _addSupport(key: string, identifier: string): this {

        // ReverseMap
        this._reverseMap.set(identifier, key);

        // SupportMap
        if (this._supportMap.has(key)) {
            const list: string[] = this._supportMap.get(key);
            this._supportMap.set(key, [...list, identifier]);
        } else {
            this._supportMap.set(key, [identifier]);
        }
        return this;
    }

    private _removeIdentifier(identifier: string): boolean {

        // ReverseMap
        const key: string | undefined = this._reverseMap.get(identifier);
        if (!key) {
            return false;
        }
        this._reverseMap.delete(identifier);

        // SupportMap
        const identifierList: string[] | undefined = this._supportMap.get(key);
        if (!identifierList) {
            return false;
        }
        this._supportMap.set(key, identifierList.filter((each: string) => each !== identifier));
        return true;
    }

    // InstanceMap
    private _getInstances(identifers: string[]): T[] {

        const result: T[] = [];
        for (const identifer of identifers) {
            const value: T | undefined = this._instanceMap.get(identifer);
            if (typeof value !== 'undefined') {
                result.push(value);
            }
        }

        return result;
    }

    private _addInstance(identifier: string, value: T): this {

        this._instanceMap.set(identifier, value);
        return this;
    }

    private _removeInstance(identifier: string): boolean {

        return this._instanceMap.delete(identifier);
    }
}
