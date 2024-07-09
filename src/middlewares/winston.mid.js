/*
import {loggerdev} from "../utils/winston.util.js";

function winston(req, res, next) {
  req.logger = loggerdev;
  const message = `${req.method} ${
    req.url
  } - ${new Date().toLocaleTimeString()}`;
  req.logger.HTTP(message);
  return next();
}

export default winston;

*/

import { activeLogger } from "../data/dao.factory.js";

function winston(req, res, next) {
  req.logger = activeLogger;
  const message = `${req.method} ${
    req.url
  } - ${new Date().toLocaleTimeString()}`;
  req.logger.HTTP(message);
  return next();
}

export default winston;
