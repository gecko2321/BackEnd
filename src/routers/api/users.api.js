import { Router } from "express";
import CustomRouter from "../CustomRouter.router.js";
//import usersManager from "../../data/fs/UsersManager.js";
import usersManager from "../../data/mongo/managers/UsersManager.mongo.js";

//const usersRouter = Router();

class UsersRouter extends CustomRouter {
  init() {
    this.read("/", ["ADMIN"], read);
    this.read("/:uid", ["ADMIN", "USER"], readOne);
    this.create("/", ["ADMIN"], create);
    this.update("/:uid", ["ADMIN","USER"], update);
    this.destroy("/:uid", ["ADMIN", "USER"], destroy);
    this.read("/paginate", ["PUBLIC"], paginate);
  }
}

const usersRouter = new UsersRouter();
export default usersRouter.getRouter();

async function create(req, res, next) {
  try {
    const data = req.body;
    const one = await usersManager.create(data);
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
    const { role } = req.query;
    const all = await usersManager.read(role);
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

async function readOne(req, res, next) {
  try {
    const { uid } = req.params;
    const one = await usersManager.readOne(uid);
    if (one) {
      //  return res.json({
      //    statusCode: 200,
      //    response: one,
      //  });
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
    const { uid } = req.params;
    const data = req.body;
    const one = await usersManager.update(uid, data);
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
    const { uid } = req.params;
    const one = await usersManager.destroy(uid);
    // return res.json({
    //   statusCode: 200,
    //   response: one,
    // });
    return res.response200(one);
  } catch (error) {
    return next(error);
  }
}

async function paginate(req, res, next) {
  try {
    const filter = {};
    const opts = {};
    const all = await usersManager.paginate({ filter, opts });
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

//export default usersRouter;
