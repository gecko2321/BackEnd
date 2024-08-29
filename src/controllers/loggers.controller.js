import { activeLogger } from "../data/dao.factory.js";

class LoggersController {
  async read(req, res, next) {
    activeLogger.FATAL("This is a FATAL level log");
    activeLogger.ERROR("This is an ERROR level log");
    activeLogger.INFO("This is an INFO level log");
    activeLogger.HTTP("This is an HTTP level log");

    res.response200("Logger levels tested. Check your logs.");
  }
}

const loggersController = new LoggersController();

const { read } = loggersController;
export { read };
