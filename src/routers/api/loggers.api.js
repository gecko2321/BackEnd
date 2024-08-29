import { Router } from "express";
import CustomRouter from "../CustomRouter.router.js";
import { read } from "../../controllers/loggers.controller.js";

class LoggersRouter extends CustomRouter {
  init() {
    this.read("/", ["PUBLIC"], read);
  }
}

const loggersRouter = new LoggersRouter();
export default loggersRouter.getRouter();
