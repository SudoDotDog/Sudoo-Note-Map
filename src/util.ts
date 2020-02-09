/**
 * @author WMXPY
 * @namespace Note_Map
 * @description Util
 */

import { randomUnique } from "@sudoo/random";

export const generateIdentifier = (): string => {

    return randomUnique();
};
