declare module "egg-static" {
  // plain object
  type PlainObject<T = any> = { [key: string]: T };

  interface IEggStaticConfig {
    prefix?: string;
    dir?: string | ({ prefix: string; dir: string } | string)[];
    // support lazy load
    dynamic?: boolean;
    preload?: boolean;
    buffer?: boolean;
    maxFiles?: number;
  }

  export type EggStaticConfig = IEggStaticConfig & PlainObject;
}
