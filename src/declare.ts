/**
 * @author WMXPY
 * @namespace Note_Map
 * @description Declare
 */

export type NoteMapSnapshotKey = {

    readonly identifiers: string[];
};

export type NoteMapSnapshot = {

    readonly keys: NoteMapSnapshotKey[];
};
