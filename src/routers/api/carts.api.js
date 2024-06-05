import { Router } from "express";
import CustomRouter from "../CustomRouter.router.js";
//import cartsManager from "../../data/fs/CartsManager.js";
import cartsManager from "../../data/mongo/managers/CartsManager.mongo.js";

//const cartsRouter = Router();

class CartsRouter extends CustomRouter {
  init() {
    //cartsRouter.get("/", read);
    this.read("/", ["PUBLIC"], paginate);
    this.read("/:pid", ["PUBLIC"], readOne);
    this.create("/", ["USER", "ADMIN"], create);
    this.update("/:pid", ["USER", "ADMIN"], update);
    this.destroy("/all", ["PUBLIC"], destroyAll);
    this.destroy("/:pid", ["PUBLIC"], destroy);
  }
}

const cartsRouter = new CartsRouter();
export default cartsRouter.getRouter();

async function create(req, res, next) {
  try {
    const data = req.body;
    const one = await cartsManager.create(data);
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
    const { user_id } = req.query;
    if (user_id) {
      const all = await cartsManager.read({ user_id });
      if (all.length > 0) {
        // return res.json({
        //   statusCode: 200,
        //   message: "READ",
        //   response: all,
        // });
        return res.response200(all);
      }
    }
    const error = new Error("Not found!");
    error.statusCode = 404;
    throw error;
  } catch (error) {
    return next(error);
  }
}

async function paginate(req, res, next) {
  try {
    const filter = {};
    if (req.query.user_id) {
      filter.user_id = req.query.user_id;
    }
    const options = {
      limit: req.query.limit || 4,
      page: req.query.page || 1,
    };
    const cart = await cartsManager.paginate({ filter, options });
    // return res.json({
    //   statusCode: 200,
    //   response: cart,
    // });
    return res.paginate(cart);
  } catch (error) {
    return next(error);
  }
}

async function readOne(req, res, next) {
  try {
    const { pid } = req.params;
    const one = await cartsManager.readOne(pid);
    if (one) {
      // return res.json({
      //   statusCode: 200,
      //   response: one,
      // });
      return res.response200(one);
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
    const one = await cartsManager.update(pid, data);
    // return res.json({
    //   statusCode: 200,
    //   response: one,
    // });
    return res.response200(one);
  } catch (error) {
    return next(error);
  }
}

async function destroy(req, res, next) {
  try {
    const { pid } = req.params;
    const one = await cartsManager.destroy(pid);
    // return res.json({
    //   statusCode: 200,
    //   response: one,
    // });
    return res.response200(one);
  } catch (error) {
    return next(error);
  }
}

async function destroyAll(req, res, next) {
  try {
    const { user_id } = req.query;

    if (!user_id) {
      return res.status(400).json({ message: "user_id es requerido" });
    }

    const result = await cartsManager.destroyAll(user_id);

    if (result.deletedCount === 0) {
      return res
        .status(404)
        .json({ message: "No se encontraron productos para eliminar" });
    }

    return res
      .status(200)
      .json({ message: "Todos los productos han sido eliminados del carrito" });
  } catch (error) {
    return next(error);
  }
}

//export default cartsRouter;
