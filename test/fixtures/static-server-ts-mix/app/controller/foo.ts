import { Controller } from "egg";

export default class HomeController extends Controller {
  async index() {
    this.ctx.body = "hello world";
    this.ctx.type = "text";
    this.ctx.status = 200;
  }
}
