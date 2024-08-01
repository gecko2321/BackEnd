import CustomRouter from "../CustomRouter.router.js";
import isText from "../../middlewares/isText.mid.js";
import isValidAdmin from "../../middlewares/isValidAdmin.mid.js";
import {
  create,
  read,
  paginate,
  readOne,
  update,
  destroy,
} from "../../controllers/products.controller.js";
import validate from "../../middlewares/joi.mid.js"
import productsSchema from "../../schemas/product.schema.js";

class ProductsRouter extends CustomRouter {
  init() {
    this.read("/", ["PUBLIC"], read);
    this.read("/paginate", ["PUBLIC"], paginate);
    this.read("/:pid", ["PUBLIC"], readOne);
    //Para utilizar por interface grafica, con validacion de permisos y administracion
    this.create("/", ["ADMIN"],validate(productsSchema), isValidAdmin, isText, create);
    //Para utilizar desde postman, swagger, supertest, etc sin validacion de permisos
    //this.create("/", ["PUBLIC"],validate(productsSchema), isText, create);
    this.update("/:pid", ["ADMIN"], update);
    this.destroy("/:pid", ["ADMIN"], destroy);
  }
}

const productsRouter = new ProductsRouter();
export default productsRouter.getRouter();

//export default productsRouter;
