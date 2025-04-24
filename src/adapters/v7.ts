import type { RenderTexture } from "pixi.js";
import { PixiAdapterV6 } from "./v6";

export class PixiAdapterV7 extends PixiAdapterV6 {
  createRenderTexture(width: number, height: number, scaleMode?: string | number | undefined, resolution?: number | undefined): PIXI.RenderTexture {
    const opts : any = { width, height }
    if(scaleMode !== undefined) {
      opts.scaleMode = scaleMode;
    }
    if(resolution !== undefined) {
      opts.resolution = resolution;
    }
    return PIXI.RenderTexture.create(opts);
  }
  renderRenderTexture(renderer: { render: (...args: any[]) => any; }, renderTexture: RenderTexture, sprite: PIXI.Graphics | PIXI.Sprite | PIXI.Container | PIXI.DisplayObject, clear?: boolean | undefined): void {
    renderer.render(sprite, {
      renderTexture,
      clear
    })
  }
}