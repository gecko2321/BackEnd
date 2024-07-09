// test-winston.js
import { createLogger, format, transports, addColors } from "winston";

const { combine, colorize, simple } = format;

const levels = { FATAL: 0, ERROR: 1, INFO: 2, HTTP: 3 };
const colors = { FATAL: "red", ERROR: "yellow", INFO: "blue", HTTP: "white" };
addColors(colors);

const logger = createLogger({
  levels,
  format: combine(colorize(), simple()),
  transports: [new transports.Console({ level: "HTTP" })],
});

console.log("Logger methods:", Object.keys(logger));
logger.info("Logger initialized");
