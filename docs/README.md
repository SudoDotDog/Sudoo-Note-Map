# Sudoo-Note-Map

[![Build Status](https://travis-ci.com/SudoDotDog/Sudoo-Note-Map.svg?branch=master)](https://travis-ci.com/SudoDotDog/Sudoo-Note-Map)
[![codecov](https://codecov.io/gh/SudoDotDog/Sudoo-Note-Map/branch/master/graph/badge.svg)](https://codecov.io/gh/SudoDotDog/Sudoo-Note-Map)
[![npm version](https://badge.fury.io/js/%40sudoo%2Fnote-map.svg)](https://badge.fury.io/js/%40sudoo%2Fnote-map)
[![downloads](https://img.shields.io/npm/dm/@sudoo/note-map.svg)](https://www.npmjs.com/package/@sudoo/note-map)

:rooster: Cross check ready note map

## Install

```sh
npm install @sudoo/node-map --save
# Or
yarn add @sudoo/node-map
```

## Usage

```ts
import { NoteMap } from "@sudoo/node-map";

const map: NoteMap<string> = NoteMap.create();
const identifier: string = map.setAndGetIdentifer(key, value);
const result: string | undefined = map.getInstanceByIdentifier(identifier);
```
