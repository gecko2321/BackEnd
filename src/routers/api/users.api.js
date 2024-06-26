import { Router } from "express";
import CustomRouter from "../CustomRouter.router.js";
//import usersManager from "../../data/fs/UsersManager.js";
import {create,read,readOne,update,destroy,paginate} from "../../controllers/users.controller.js"

class UsersRouter extends CustomRouter {
  init() {
    this.read("/", ["PUBLIC"], read);
    this.read("/:uid", ["PUBLIC"], readOne);
    this.create("/", ["PUBLIC"], create);
    this.update("/:uid", ["USER","ADMIN"], update);
    this.destroy("/:uid", ["USER","ADMIN"], destroy);
    this.read("/paginate", ["USER","ADMIN"], paginate);
  }
}

const usersRouter = new UsersRouter();
export default usersRouter.getRouter();

