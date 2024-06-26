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
    this.read("/", ["USER","ADMIN"], paginate);
    this.read("/:pid", ["USER","ADMIN"], readOne);
    this.create("/", ["USER","ADMIN"], create);
    this.update("/:pid", ["USER","ADMIN"], update);
    this.destroy("/all", ["USER","ADMIN"], destroyAll);
    this.destroy("/:pid", ["USER","ADMIN"], destroy);
  }
}

const cartsRouter = new CartsRouter();
export default cartsRouter.getRouter();
