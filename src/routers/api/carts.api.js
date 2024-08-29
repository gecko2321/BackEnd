import CustomRouter from "../CustomRouter.router.js";
import {
  create,
  read,
  readOne,
  update,
  destroy,
  paginate,
  destroyAll,
} from "../../controllers/carts.controller.js";
//import cartsManager from "../../data/fs/CartsManager.js";

class CartsRouter extends CustomRouter {
  init() {
    //cartsRouter.get("/", read);
    this.read("/", ["USER", "ADMIN", "PREM"], paginate);
    this.read("/:pid", ["USER", "ADMIN", "PREM"], readOne);
    this.create("/", ["USER", "ADMIN", "PREM"], create);
    this.update("/:pid", ["USER", "ADMIN", "PREM"], update);
    this.destroy("/all", ["USER", "ADMIN", "PREM"], destroyAll);
    this.destroy("/:pid", ["USER", "ADMIN", "PREM"], destroy);
  }
}

const cartsRouter = new CartsRouter();
export default cartsRouter.getRouter();
