import { Router } from "express";
import CustomRouter from "../CustomRouter.router.js";
//import usersManager from "../../data/fs/UsersManager.js";
import {create,read,readOne,update,destroy,paginate} from "../../controllers/users.controller.js"

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

