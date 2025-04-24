import type { IPIXIAdapter } from "./adapters/IPixiAdapter";
export * from './types';
export * from './utils';

import { PixiAdapterV4 } from "./adapters/v4";
import { PixiAdapterV5 } from "./adapters/v5";
import { PixiAdapterV6 } from "./adapters/v6";
import { PixiAdapterV7 } from "./adapters/v7";
import { PixiAdapterV8 } from "./adapters/v8";

let ADAPTER : IPIXIAdapter;
const version = parseFloat(PIXI.VERSION)
if(version < 4) {
  throw new Error(`Pixi version ${version} is not supported. Please use version 4 or higher.`);
}
if(version >= 8) {
  ADAPTER = new PixiAdapterV8();
} else if(version >= 7) {
  ADAPTER = new PixiAdapterV7();
} else if(version >= 6) {
  ADAPTER = new PixiAdapterV6();
} else if(version >= 5) {
  ADAPTER = new PixiAdapterV5();
} else {
  ADAPTER = new PixiAdapterV4();
}

export default ADAPTER;
export { ADAPTER }