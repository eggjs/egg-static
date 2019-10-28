import "egg";
import FooController from "../app/controller/foo";

declare module "egg" {
  interface IController {
    foo: FooController;
  }
}
