/**
 * @author WMXPY
 * @namespace Note_Map
 * @description Map
 */

import { randomUnique } from "@sudoo/random";

export class NoteMap<T extends any> {

    public static create<T extends any>() {

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

    /**
     * Return the size of keys
     * 
     * @returns The size of keys
     */
    public get length(): number {
        return this._supportMap.size;
    }
    /**
     * Return the size of instances
     * 
     * @returns The size of instances
     */
    public get size(): number {
        return this._instanceMap.size;
    }

    // Basics
    public getAllKeys(): string[] {

        return [...this._supportMap.keys()];
    }

    public getAllIdentifiers(): string[] {

        return [...this._reverseMap.keys()];
    }

    public getAllInstances(): T[] {

        return [...this._instanceMap.values()];
    }

    // Mutations
    public setAndGetIdentifer(key: string, value: T): string {

        const identifier: string = randomUnique();
        this._addSupport(key, identifier);
        this._addInstance(identifier, value);
        return identifier;
    }

    public getKeyByIdentifier(identifier: string): string | undefined {

        return this._getKey(identifier);
    }

    public getInstanceByIdentifier(identifier: string): T | undefined {

        return this._getInstance(identifier);
    }

    public getAllIdentifiersByKey(key: string): string[] {

        const identifers: string[] = this._getIdentifiers(key);
        return identifers;
    }

    public getAllInstancesByKey(key: string): T[] {

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

    public removeAllByKey(key: string): {
        readonly succeed: number;
        readonly failed: number;
    } {

        const identifiers: string[] = this._getIdentifiers(key);

        let succeed: number = 0;
        let failed: number = 0;
        for (const identifier of identifiers) {
            const result: boolean = this.removeByIdentifier(identifier);
            if (result) {
                succeed++;
            } else {
                failed++;
            }
        }

        return {
            succeed,
            failed,
        };
    }

    // ReverseMap
    private _getKey(identifier: string): string | undefined {

        return this._reverseMap.get(identifier);
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
            const list: string[] | undefined = this._supportMap.get(key);
            const fixedList: string[] = list ?? [];
            this._supportMap.set(key, [...fixedList, identifier]);
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
        const newIdentifierList: string[] = identifierList.filter((each: string) => each !== identifier);
        if (newIdentifierList.length === 0) {
            this._supportMap.delete(key);
        } else {
            this._supportMap.set(key, newIdentifierList);
        }
        return true;
    }

    // InstanceMap
    private _getInstance(identifer: string): T | undefined {

        return this._instanceMap.get(identifer);
    }

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
