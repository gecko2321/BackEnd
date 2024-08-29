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
    //Por el tema de los testings con supertest
    //this.destroy("/:uid", ["USER","ADMIN"], destroy);
    this.destroy("/:uid", ["PUBLIC"], destroy);
    this.destroy("/:uid", ["PUBLIC"], destroy);
    this.read("/paginate", ["USER","ADMIN"], paginate);
  }
}

const usersRouter = new UsersRouter();
export default usersRouter.getRouter();

