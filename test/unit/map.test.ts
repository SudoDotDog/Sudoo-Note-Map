/**
 * @author WMXPY
 * @namespace Note_Map
 * @description Map
 * @package Unit
 */

import { expect } from "chai";
import * as Chance from "chance";
import { NoteMap } from "../../src";

describe('Given {NoteMap} Class', (): void => {

    const chance: Chance.Chance = new Chance('note-map-map');

    it('should be able to set value', (): void => {

        const key: string = chance.string();
        const value: string = chance.string();

        const map: NoteMap<string> = NoteMap.create();

        const identifier: string = map.setAndGetIdentifer(key, value);

        expect(map).to.be.lengthOf(1);
        expect(map.size).to.be.equal(1);
        // tslint:disable-next-line: no-unused-expression
        expect(identifier).to.be.string;
    });

    it('should be able to get value by identifier', (): void => {

        const key: string = chance.string();
        const value: string = chance.string();

        const map: NoteMap<string> = NoteMap.create();

        const identifier: string = map.setAndGetIdentifer(key, value);

        const result: string | undefined = map.getInstanceByIdentifier(identifier);

        expect(map).to.be.lengthOf(1);
        expect(map.size).to.be.equal(1);
        expect(result).to.be.equal(value);
    });

    it('should be able to get key by identifier', (): void => {

        const key: string = chance.string();
        const value: string = chance.string();

        const map: NoteMap<string> = NoteMap.create();

        const identifier: string = map.setAndGetIdentifer(key, value);

        const result: string | undefined = map.getKeyByIdentifier(identifier);

        expect(map).to.be.lengthOf(1);
        expect(map.size).to.be.equal(1);
        expect(result).to.be.equal(key);
    });

    it('should be able to get identifiers by key', (): void => {

        const key: string = chance.string();
        const value1: string = chance.string();
        const value2: string = chance.string();

        const map: NoteMap<string> = NoteMap.create();

        const identifier1: string = map.setAndGetIdentifer(key, value1);
        const identifier2: string = map.setAndGetIdentifer(key, value2);

        const results: string[] = map.getAllIdentifiersByKey(key);

        expect(map).to.be.lengthOf(1);
        expect(map.size).to.be.equal(2);
        expect(results).to.be.lengthOf(2);
        expect(results).to.be.includes(identifier1);
        expect(results).to.be.includes(identifier2);
    });

    it('should be able to get values by key', (): void => {

        const key: string = chance.string();
        const value1: string = chance.string();
        const value2: string = chance.string();

        const map: NoteMap<string> = NoteMap.create();

        const identifier1: string = map.setAndGetIdentifer(key, value1);
        const identifier2: string = map.setAndGetIdentifer(key, value2);

        const results: string[] = map.getAllInstancesByKey(key);

        expect(map).to.be.lengthOf(1);
        expect(map.size).to.be.equal(2);
        expect(results).to.be.lengthOf(2);
        expect(results).to.be.includes(value1);
        expect(results).to.be.includes(value2);
    });

    it('should be able to remove values by key - remove all', (): void => {

        const key: string = chance.string();
        const value1: string = chance.string();
        const value2: string = chance.string();

        const map: NoteMap<string> = NoteMap.create();

        const identifier1: string = map.setAndGetIdentifer(key, value1);
        const identifier2: string = map.setAndGetIdentifer(key, value2);

        expect(map).to.be.lengthOf(1);
        expect(map.size).to.be.equal(2);
        map.removeAllByKey(key);
        expect(map).to.be.lengthOf(0);
        expect(map.size).to.be.equal(0);
    });

    it('should be able to remove values by key - remove some', (): void => {

        const key1: string = chance.string();
        const key2: string = chance.string();
        const value1: string = chance.string();
        const value2: string = chance.string();

        const map: NoteMap<string> = NoteMap.create();

        const identifier1: string = map.setAndGetIdentifer(key1, value1);
        const identifier2: string = map.setAndGetIdentifer(key2, value2);

        expect(map).to.be.lengthOf(2);
        expect(map.size).to.be.equal(2);
        map.removeAllByKey(key1);
        expect(map).to.be.lengthOf(1);
        expect(map.size).to.be.equal(1);
    });

    it('should be able to get all keys', (): void => {

        const key1: string = chance.string();
        const key2: string = chance.string();
        const value1: string = chance.string();
        const value2: string = chance.string();

        const map: NoteMap<string> = NoteMap.create();

        const identifier1: string = map.setAndGetIdentifer(key1, value1);
        const identifier2: string = map.setAndGetIdentifer(key2, value2);

        const keys: string[] = map.getAllKeys();

        expect(keys).to.be.lengthOf(2);
        expect(keys).to.be.includes(key1);
        expect(keys).to.be.includes(key2);
    });

    it('should be able to get all instances', (): void => {

        const key1: string = chance.string();
        const key2: string = chance.string();
        const value1: string = chance.string();
        const value2: string = chance.string();

        const map: NoteMap<string> = NoteMap.create();

        const identifier1: string = map.setAndGetIdentifer(key1, value1);
        const identifier2: string = map.setAndGetIdentifer(key2, value2);

        const instances: string[] = map.getAllInstances();

        expect(instances).to.be.lengthOf(2);
        expect(instances).to.be.includes(value1);
        expect(instances).to.be.includes(value2);
    });

    it('should be able to get all identifiers', (): void => {

        const key1: string = chance.string();
        const key2: string = chance.string();
        const value1: string = chance.string();
        const value2: string = chance.string();

        const map: NoteMap<string> = NoteMap.create();

        const identifier1: string = map.setAndGetIdentifer(key1, value1);
        const identifier2: string = map.setAndGetIdentifer(key2, value2);

        const identifiers: string[] = map.getAllIdentifiers();

        expect(identifiers).to.be.lengthOf(2);
        expect(identifiers).to.be.includes(identifier1);
        expect(identifiers).to.be.includes(identifier2);
    });

    it('should be able to remove by value', (): void => {

        const key1: string = chance.string();
        const key2: string = chance.string();
        const value1: string = chance.string();
        const value2: string = chance.string();
        const value3: string = chance.string();

        const map: NoteMap<string> = NoteMap.create();

        const identifier1: string = map.setAndGetIdentifer(key1, value1);
        const identifier2: string = map.setAndGetIdentifer(key2, value2);
        const identifier3: string = map.setAndGetIdentifer(key2, value3);
        const identifier4: string = map.setAndGetIdentifer(key1, value2);

        // tslint:disable-next-line: no-magic-numbers
        expect(map).to.be.lengthOf(2);
        // tslint:disable-next-line: no-magic-numbers
        expect(map.size).to.be.equal(4);

        const count: number = map.removeByValue(value2);

        expect(count).to.be.equal(2);
        expect(map).to.be.lengthOf(2);
        expect(map.size).to.be.equal(2);
    });
});
