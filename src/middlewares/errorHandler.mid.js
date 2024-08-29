/*
import {loggerdev} from "../utils/winston.util.js";

function errorHandler(error, req, res, next) {
  const message = `${req.method} ${
    req.url
  } ${error.statusCode} - ${new Date().toLocaleTimeString()} - ${error.message}`;
  //console.log(error)
  loggerdev.ERROR(message);
  return res.json({
    statusCode: error.statusCode || 500,
    message: error.message || "CODER API ERROR",
  });
}

export default errorHandler;

*/

import { activeLogger } from "../data/dao.factory.js";

function errorHandler(error, req, res, next) {
  const message = `${req.method} ${req.url} ${
    error.statusCode
  } - ${new Date().toLocaleTimeString()} - ${error.message}`;
  activeLogger.ERROR(message);
  return res.json({
    statusCode: error.statusCode || 500,
    message: error.message || "CODER API ERROR",
  });
}

export default errorHandler;
