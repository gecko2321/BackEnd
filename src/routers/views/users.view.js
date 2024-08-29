import { Router } from "express";
//import usersManager from "../../data/fs/UsersManager.js";
//import usersManager from "../../data/mongo/managers/UsersManager.mongo.js";
import {dao} from "../../data/dao.factory.js";

const usersRouter = Router();
const usersDao = dao.users

usersRouter.get("/", async (req, res, next) => {
  try {
    const users = await usersDao.read();
    return res.render("users", { users,title: "Usuarios del Sistema" });
  } catch (error) {
    return next(error);
  }
});

usersRouter.get("/verify", async (req, res, next) => {
  try {
    const users = await usersDao.read();
    return res.render("usersVerify", { users,title: "Verificacion" });
  } catch (error) {
    return next(error);
  }
});

usersRouter.get("/register", async (req, res, next) => {
  try {
    const users = await usersDao.read();
    return res.render("usersRegister", { users,title: "Registro de nuevo Usuario" });
  } catch (error) {
    return next(error);
  }
});

usersRouter.get("/password", async (req, res, next) => {
  try {
    const users = await usersDao.read();
    return res.render("usersRestorePassword1", { users,title: "Reestablecer Password" });
  } catch (error) {
    return next(error);
  }
});

usersRouter.get("/restorepassword", async (req, res, next) => {
  try {
    const users = await usersDao.read();
    return res.render("usersRestorePassword", { users,title: "Reestablecer Password" });
  } catch (error) {
    return next(error);
  }
});

usersRouter.get("/login", async (req, res, next) => {
  try {
    const users = await usersDao.read();
    return res.render("usersLogin", { users,title: "Inicio de Sesion" });
  } catch (error) {
    return next(error);
  }
});

usersRouter.get("/:uid", async (req, res, next) => {
  try {
    const { uid } = req.params;
    const one = await usersDao.readOne(uid);
    console.log(one)
    return res.render("usersDetail", { user: one,title: "Detalle de Usuario" });
  } catch (error) {
    return next(error);
  }
});


export default usersRouter;
