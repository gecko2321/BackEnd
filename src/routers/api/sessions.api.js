import CustomRouter from "../CustomRouter.router.js";
import { Router } from "express";
import isValidData from "../../middlewares/isValidData.mid.js";
import passport from "../../middlewares/passport.mid.js";
import isAuth from "../../middlewares/isAuth.mid.js";
import passportCb from "../../middlewares/passportCb.mid.js";
import {
  register,
  login,
  online,
  signout,
  verify,
} from "../../controllers/sessions.controller.js";
import validate from "../../middlewares/joi.mid.js"
import usersSchema from "../../schemas/user.schema.js";

class SessionsRouter extends CustomRouter {
  init() {
    this.create(
      "/register",
      ["PUBLIC"],
      validate(usersSchema),
      isValidData,
      passportCb("register"),
      register
    );
    this.create("/login", ["PUBLIC"],passportCb("login"), login);
    this.read("/online", ["PUBLIC"], passportCb("jwt"), online);
    this.create("/signout", ["PUBLIC"], passportCb("jwt"), signout);
    this.create("/verify", ["PUBLIC"], verify);
  }
}

const sessionsRouter = new SessionsRouter();
export default sessionsRouter.getRouter();
