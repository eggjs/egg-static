import path from "path";
import { EggAppInfo, EggAppConfig, PowerPartial } from "egg";

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  config.keys = "123123";

  config.static = {
    dir: [
      {
        prefix: "/public",
        dir: path.join(appInfo.baseDir, "/app/public")
      },
      {
        prefix: "/build",
        dir: path.join(appInfo.baseDir, "/build")
      }
    ]
  };
};
