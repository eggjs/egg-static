import path from "path";
import { EggAppInfo, EggAppConfig, PowerPartial } from "egg";

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  config.keys = "123123";

  config.static = {
    dir: [
      path.join(appInfo.baseDir, "/app/public"),
      path.join(appInfo.baseDir, "/build")
    ]
  };
};
