import CustomRouter from "../CustomRouter.router.js";
import isText from "../../middlewares/isText.mid.js";
import isValidAdminOrPrem from "../../middlewares/isValidAdminOrPrem.mid.js";
import productManagement from "../../middlewares/productManagement.mid.js";
import {
  create,
  read,
  paginate,
  paginateMe,
  readOne,
  update,
  destroy,
} from "../../controllers/products.controller.js";
import validate from "../../middlewares/joi.mid.js";
import productsSchema from "../../schemas/product.schema.js";

class ProductsRouter extends CustomRouter {
  init() {
    this.read("/", ["PUBLIC"], read);
    this.read("/paginate", ["PUBLIC"], paginate);
    this.read("/me", ["PREM", "ADMIN"], paginateMe);
    this.read("/:pid", ["PUBLIC"], readOne);
    //Para utilizar por interface grafica, con validacion de permisos y administracion
    this.create(
      "/",
      ["ADMIN", "PREM"],
      validate(productsSchema),
      isText,
      create
    );
    //Para utilizar desde postman, swagger, supertest, etc sin validacion de permisos
    //this.create("/", ["PUBLIC"],validate(productsSchema), isText, create);
    this.update("/:pid", ["ADMIN", "PREM"], productManagement, update);
    this.destroy("/:pid", ["ADMIN", "PREM"], productManagement, destroy);
  }
}

const productsRouter = new ProductsRouter();
export default productsRouter.getRouter();

//export default productsRouter;
