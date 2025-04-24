to build:

`npm i`

`npm run build`


interface for the adapter - singleton is accessed through `window.PIXI_ADAPTER`

```ts
interface IPIXIAdapter<T=Texture, BT=BaseTexture, RT=RenderTexture> {
  createRenderTexture(
    width: number,
    height: number,
    scaleMode?: string | number,
    resolution?: number
  ): RT;
  
  renderRenderTexture(
    renderer: { render: (...args: any[]) => any },
    renderTexture: RT,
    sprite: Graphics | Sprite | Container | DisplayObject,
    clear?: boolean
  ): void;

  ensureTextureLoaded(texture: T): Promise<T>;

  setScaleMode(scaleMode: PIXI_ADAPTER_SCALE_MODES): void;

  textureFromUrl(url: string, options?: { scaleMode?: PIXI_ADAPTER_SCALE_MODES, resolution?: number }): Promise<T>;

  textureFromTexture(texture: T | BT, rect: { x: number, y: number, width: number, height: number }) : T;

  textureFromImage(img: HTMLImageElement): T;

  newLoader(): IPixiLoader;

  sharedLoader(): IPixiLoader;
}
```

Look through the `/test` directory to see how the library can be used. 