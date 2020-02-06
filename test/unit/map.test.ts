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
        // tslint:disable-next-line: no-unused-expression
        expect(identifier).to.be.string;
    });

    it('should be able to get value by identifier', (): void => {

        const key: string = chance.string();
        const value: string = chance.string();

        const map: NoteMap<string> = NoteMap.create();

        const identifier: string = map.setAndGetIdentifer(key, value);

        const result: string | undefined = map.getByIdentifier(identifier);

        expect(map).to.be.lengthOf(1);
        expect(result).to.be.equal(value);
    });

    it('should be able to get values by key', (): void => {

        const key: string = chance.string();
        const value1: string = chance.string();
        const value2: string = chance.string();

        const map: NoteMap<string> = NoteMap.create();

        const identifier1: string = map.setAndGetIdentifer(key, value1);
        const identifier2: string = map.setAndGetIdentifer(key, value2);

        const results: string[] = map.getAllByKey(key);

        expect(map).to.be.lengthOf(1);
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

        map.removeAllByKey(key);

        expect(map).to.be.lengthOf(0);
    });
});
