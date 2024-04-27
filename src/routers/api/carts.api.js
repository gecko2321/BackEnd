import { Router } from "express";
//import cartsManager from "../../data/fs/CartsManager.js";
import cartsManager from "../../data/mongo/CartsManager.mongo.js";

const cartsRouter = Router();

cartsRouter.get("/", read);
cartsRouter.get("/:pid", readOne);
cartsRouter.post("/", create);
cartsRouter.put("/:pid", update);
cartsRouter.delete("/:pid", destroy);

async function create(req, res, next) {
  try {
    const data = req.body;
    const one = await cartsManager.create(data);
    return res.json({
      statusCode: 201,
      message: "CREATED ID: " + one.id,
    });
  } catch (error) {
    return next(error);
  }
}

async function read(req, res, next) {
  try {
    const { user_id } = req.query;
    if (user_id) {
      const all = await cartsManager.read({ user_id });
      if (all.length >0) {
        return res.json({
          statusCode: 200,
          message: "READ",
          response: all,
        });
      }
    }
    const error = new Error("Not found!");
    error.statusCode = 404;
    throw error;
  } catch (error) {
    return next(error);
  }
}

async function readOne(req, res, next) {
  try {
    const { pid } = req.params;
    const one = await cartsManager.readOne(pid);
    if (one) {
      return res.json({
        statusCode: 200,
        response: one,
      });
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
    return res.json({
      statusCode: 200,
      response: one,
    });
  } catch (error) {
    return next(error);
  }
}

async function destroy(req, res, next) {
  try {
    const { pid } = req.params;
    const one = await cartsManager.destroy(pid);
    return res.json({
      statusCode: 200,
      response: one,
    });
  } catch (error) {
    return next(error);
  }
}

export default cartsRouter;
