import type { RenderTexture } from "pixi.js";
import { PixiAdapterV7 } from "./v7";
import { PIXI_ADAPTER_SCALE_MODES } from "../types";

export class PixiAdapterV8 extends PixiAdapterV7 {
  renderRenderTexture(renderer: { render: (...args: any[]) => any; }, renderTexture: RenderTexture, sprite: PIXI.Graphics | PIXI.Sprite | PIXI.Container | PIXI.DisplayObject, clear?: boolean | undefined): void {
    renderer.render({
      container: sprite,
      target: renderTexture,
      clear
    })
  }
  async ensureTextureLoaded(texture: PIXI.Texture): Promise<PIXI.Texture> {
    return texture;
  }
  createTexture(texture: PIXI.Texture | PIXI.BaseTexture, rect: { x: number; y: number; width: number; height: number; }): PIXI.Texture {
    return new PIXI.Texture({
      source: 'baseTexture' in texture ? texture.baseTexture : texture,
      frame: rect,
    } as any)
  }
  setScaleMode(scaleMode: PIXI_ADAPTER_SCALE_MODES): void {
    (PIXI as any).AbstractRenderer.defaultOptions.scaleMode = scaleMode;
  }
  textureFromTexture(texture: PIXI.Texture | PIXI.BaseTexture, rect: { x: number; y: number; width: number; height: number; }): PIXI.Texture {
    return new PIXI.Texture({
      source: 'baseTexture' in texture ? texture.baseTexture : texture,
      frame: rect,
    } as any)
  }
  async textureFromUrl(url: string, options?: { scaleMode?: PIXI_ADAPTER_SCALE_MODES | undefined; resolution?: number | undefined; } | undefined): Promise<PIXI.Texture> {
    const params : any = {
      src: url
    };
    if(options?.scaleMode !== undefined) {
      params.data = {
        scaleMode: options.scaleMode === PIXI_ADAPTER_SCALE_MODES.NEAREST ? 'nearest' : 'linear',
      };
    }
    if(options?.resolution !== undefined) {
      params.data = params.data || {};
      params.data.resolution = options.resolution;
    }
    // @ts-expect-error
    const t = await PIXI.Assets.load(params);
    return t;
  }
  textureFromImage(image: HTMLImageElement): PIXI.Texture {
    const source = new (PIXI as any)['CanvasSource']({
      resource: image,
    });
    // create a texture
    const texture = new PIXI.Texture({
      source
    } as any);
    return texture;
  }
}