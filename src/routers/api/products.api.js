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
import productsManager from "../../data/mongo/managers/ProductsManager.mongo.js";
import isText from "../../middlewares/isText.mid.js";
import isValidAdmin from "../../middlewares/isValidAdmin.mid.js";

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

async function create(req, res, next) {
  try {
    const data = req.body;
    const one = await productsManager.create(data);
    // return res.json({
    //   statusCode: 201,
    //   message: "CREATED ID: " + one.id,
    // });
    return res.message201("CREATED ID: " + one.id);
  } catch (error) {
    return next(error);
  }
}

async function read(req, res, next) {
  try {
    const { category } = req.query;
    const all = await productsManager.read(category);
    if (all.length > 0) {
      // return res.json({
      //   statusCode: 200,
      //   response: all,
      // });
      return res.response200(all);
    } else {
      const error = new Error("Not found!");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    return next(error);
  }
}

async function paginate(req, res, next) {
  try {
    const filter = {};
    if (req.query.product_id) {
      filter.product_id = req.query.product_id;
    }
    const options = {
      limit: req.query.limit || 5,
      page: req.query.page || 1,
    };
    const products = await productsManager.paginate({ filter, options });
    // return res.json({
    //   statusCode: 200,
    //   response: products,
    // });
    return res.paginate(products);
  } catch (error) {
    return next(error);
  }
}

async function readOne(req, res, next) {
  try {
    const { pid } = req.params;
    const one = await productsManager.readOne(pid);
    if (one) {
      //  return res.json({
      //    statusCode: 200,
      //    response: one,
      //  });
      res.response200(one);
    } else {
      const error = new Error("Not found!");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    return next(error);
  }
}

async function update(req, res, next) {
  try {
    const { pid } = req.params;
    const data = req.body;
    const one = await productsManager.update(pid, data);
    // return res.json({
    //   statusCode: 200,
    //   response: one,
    // });
    res.response200(one);
  } catch (error) {
    return next(error);
  }
}

async function destroy(req, res, next) {
  try {
    const { pid } = req.params;
    const one = await productsManager.destroy(pid);
    // return res.json({
    //   statusCode: 200,
    //   response: one,
    // });
    res.response200(one);
  } catch (error) {
    return next(error);
  }
}

//export default productsRouter;
