import CustomRouter from "../CustomRouter.router.js";
import isValidData from "../../middlewares/isValidData.mid.js";
import passportCb from "../../middlewares/passportCb.mid.js";
import {
  register,
  login,
  online,
  signout,
} from "../../controllers/sessions.controller.js";

class SessionsRouter extends CustomRouter {
  init() {
    this.create(
      "/register",
      ["ADMIN"],
      isValidData,
      passportCb("register"),
      register
    );
    this.create("/login", ["PUBLIC"], passportCb("login"), login);
    this.read("/online", ["USER", "ADMIN"], passportCb("jwt"), online);
    this.create("/signout", ["USER", "ADMIN"], passportCb("jwt"), signout);
  }
}

const sessionsRouter = new SessionsRouter();
export default sessionsRouter.getRouter();
