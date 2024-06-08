/*
import { Router, response } from "express";
//import productsManager from "../../data/fs/ProductsManager.js";
import productsManager from "../../data/mongo/managers/ProductsManager.mongo.js";
import isText from "../../middlewares/isText.mid.js";
import isValidAdmin from "../../middlewares/isValidAdmin.mid.js";

const productsRouter = Router();

//productsRouter.get("/", read);
productsRouter.get("/", paginate);
productsRouter.get("/:pid", readOne);
productsRouter.post("/",isValidAdmin,isText, create);
productsRouter.put("/:pid", update);
productsRouter.delete("/:pid", destroy);
*/
import CustomRouter from "../CustomRouter.router.js";
//import productsManager from "../../data/fs/ProductsManager.fs.js";
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

class ProductsRouter extends CustomRouter {
  init() {
    this.read("/", ["PUBLIC"], read);
    this.read("/paginate", ["PUBLIC"], paginate);
    this.read("/:pid", ["PUBLIC"], readOne);
    this.create("/", ["ADMIN"], isValidAdmin, isText, create);
    this.update("/:pid", ["ADMIN"], update);
    this.destroy("/:pid", ["ADMIN"], destroy);
  }
}

const productsRouter = new ProductsRouter();
export default productsRouter.getRouter();

//export default productsRouter;
