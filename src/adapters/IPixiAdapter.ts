import type {
  RenderTexture,
  Texture,
  BaseTexture,
  Graphics,
  Sprite,
  Container,
  DisplayObject,
} from 'pixi.js';
import type { IPixiLoader, PIXI_ADAPTER_SCALE_MODES } from '../types';


export interface IPIXIAdapter<T=Texture, BT=BaseTexture, RT=RenderTexture> {
  /**
   * Creates a new RenderTexture.
   * @param width    Width in pixels
   * @param height   Height in pixels
   * @param scaleMode  One of PIXI.SCALE_MODES (defaults to LINEAR)
   * @param resolution Resolution / device pixel ratio (defaults to 1)
   */
  createRenderTexture(
    width: number,
    height: number,
    scaleMode?: string | number,
    resolution?: number
  ): RT;

  /**
   * Renders a DisplayObject (Sprite, Graphics, Container, etc.) into an existing RenderTexture.
   * @param renderer      The PIXI renderer instance
   * @param renderTexture The target RenderTexture
   * @param sprite        Any DisplayObject to render
   * @param clear         Whether to clear the texture before rendering (default `true`)
   */
  renderRenderTexture(
    renderer: { render: (...args: any[]) => any },
    renderTexture: RT,
    sprite: Graphics | Sprite | Container | DisplayObject,
    clear?: boolean
  ): void;

  /**
   * Ensures that a Texture’s base image is fully loaded before using.
   * @param texture  The PIXI.Texture to wait on
   * @returns        Resolves with the same texture once loaded
   */
  ensureTextureLoaded(texture: T): Promise<T>;

  /**
   * sets the scale mode for the renderer.
   * @param scaleMode 
   */
  setScaleMode(scaleMode: PIXI_ADAPTER_SCALE_MODES): void;


  textureFromUrl(url: string, options?: { scaleMode?: PIXI_ADAPTER_SCALE_MODES, resolution?: number }): Promise<T>;
  textureFromTexture(texture: T | BT, rect: { x: number, y: number, width: number, height: number }) : T;
  textureFromImage(img: HTMLImageElement): T;

  newLoader(): IPixiLoader;
  sharedLoader(): IPixiLoader;
}