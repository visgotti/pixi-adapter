export enum PIXI_ADAPTER_SCALE_MODES {
  LINEAR,
  NEAREST
}

export interface IPixiLoader {
  baseUrl: string;
  progress: number;
  loading: boolean;
  defaultQueryString: string;
  resources: any;
  
  add(...params: any[]): this;
  pre(fn: (...params: any[]) => any): this;
  use(fn: (...params: any[]) => any): this;
  reset(): this;
  load(cb?: (...params: any[]) => any): this;
}