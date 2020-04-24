import { PlainObject } from "egg";

declare module "egg" {
  interface EggStaticConfig {
    prefix?: string;
    dir?: string | ({ prefix: string; dir: string } | string)[];
    // support lazy load
    dynamic?: boolean;
    preload?: boolean;
    buffer?: boolean;
    maxFiles?: number;
  }

  interface EggAppConfig {
    static: EggStaticConfig & PlainObject;
  }
}
