import { IPixiLoader, PIXI_ADAPTER_SCALE_MODES } from "../types";
import type { IPIXIAdapter } from "./IPixiAdapter";
import type { RenderTexture } from "pixi.js";

export class PixiAdapterV4 implements IPIXIAdapter {
  public getVersion() {
    return parseFloat(PIXI.VERSION);
  }


  newLoader(): IPixiLoader {
    return new PIXI.loaders.Loader();
  }
  sharedLoader(): IPixiLoader {
    return PIXI.loader;
  }
  textureFromImage(image: HTMLImageElement) {
    return new PIXI.Texture(new PIXI.BaseTexture(image));
  }
  textureFromTexture(texture: PIXI.Texture | PIXI.BaseTexture, rect: { x: number; y: number; width: number; height: number; }): PIXI.Texture {
    return new PIXI.Texture(
      'baseTexture' in texture ? texture.baseTexture : texture,
       new PIXI.Rectangle(rect.x, rect.y, rect.width, rect.height)
    );  
  }
  textureFromUrl(url: string): Promise<PIXI.Texture> {
    return new Promise(async (resolve, reject) => {
      const t = PIXI.Texture.from(url);
      t.baseTexture.once('loaded', () => {
        return resolve(t);
      });
      t.baseTexture.once('error', () => {
        return reject(new Error(`Failed to load texture from url: ${url}`));
      });
    })
  }
  setScaleMode(scaleMode: PIXI_ADAPTER_SCALE_MODES): void {
    PIXI.settings.SCALE_MODE = scaleMode;
  }
  createRenderTexture(width: number, height: number, scaleMode?: string | number | undefined, resolution?: number | undefined): PIXI.RenderTexture {
    return PIXI.RenderTexture.create(width, height, scaleMode as number, resolution)
  }
  renderRenderTexture(renderer: { render: (...args: any[]) => any; }, renderTexture: RenderTexture, sprite: PIXI.Graphics | PIXI.Sprite | PIXI.Container | PIXI.DisplayObject, clear?: boolean | undefined): void {
    renderer.render(sprite, renderTexture, clear);
  }
  async ensureTextureLoaded(texture: PIXI.Texture): Promise<PIXI.Texture> {
    if(texture.baseTexture.hasLoaded) {
      return texture;
    }
    return new Promise((resolve) => {
      texture.baseTexture.once('loaded',async () => {
        return resolve(texture);
      });
    })
  }
}