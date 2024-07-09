import { Router } from "express";
//import usersManager from "../../data/fs/UsersManager.js";
//import usersManager from "../../data/mongo/managers/UsersManager.mongo.js";
import {dao} from "../../data/dao.factory.js";

const usersRouter = Router();
const usersDao = dao.users

usersRouter.get("/", async (req, res, next) => {
  try {
    const users = await usersDao.read();
    return res.render("users", { users });
  } catch (error) {
    return next(error);
  }
});

usersRouter.get("/verify", async (req, res, next) => {
  try {
    const users = await usersDao.read();
    return res.render("usersVerify", { users });
  } catch (error) {
    return next(error);
  }
});

usersRouter.get("/register", async (req, res, next) => {
  try {
    const users = await usersDao.read();
    return res.render("usersRegister", { users });
  } catch (error) {
    return next(error);
  }
});

usersRouter.get("/login", async (req, res, next) => {
  try {
    const users = await usersDao.read();
    return res.render("usersLogin", { users });
  } catch (error) {
    return next(error);
  }
});

usersRouter.get("/:uid", async (req, res, next) => {
  try {
    const { uid } = req.params;
    const one = await usersDao.readOne(uid);
    console.log(one)
    return res.render("usersDetail", { user: one });
  } catch (error) {
    return next(error);
  }
});


export default usersRouter;
