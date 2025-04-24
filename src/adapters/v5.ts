import type { IPixiLoader } from "../types";
import { PixiAdapterV4 } from "./v4";

export class PixiAdapterV5 extends PixiAdapterV4 {
  async ensureTextureLoaded(texture: PIXI.Texture): Promise<PIXI.Texture> {
    if((texture.baseTexture as any)?.valid) {
      return texture
    }
    return new Promise((resolve) => {
      texture.baseTexture.once('loaded',async () => {
        return resolve(texture);
      });
    })
  }
  newLoader(): IPixiLoader {
    // @ts-expect-error
    return new PIXI.Loader();
  }
  sharedLoader(): IPixiLoader {
    // @ts-expect-error
    return PIXI.Loader.shared
  }
}