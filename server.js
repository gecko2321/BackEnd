//Imports
import "dotenv/config.js";
import express from "express";
import indexRouter from "./src/routers/index.router.js";
import errorHandler from "./src/middlewares/errorHandler.mid.js";
import pathHandler from "./src/middlewares/pathHandler.mid.js";
import morgan from "morgan";
import { engine } from "express-handlebars";

import __dirname from "./utils.js";
import socketCb from "./src/routers/index.socket.js";
import { createServer } from "http";
import { Server } from "socket.io";
import dbConnect from "./src/utils/dbConnect.util.js";

//Server HTTP
const server = express();
const port = process.env.port || 9000;
const ready = async () => {
  console.log("server ready on port " + port);
  await dbConnect();
};
const nodeServer = createServer(server);
nodeServer.listen(port, ready);

//Server TCP
const socketServer = new Server(nodeServer);
socketServer.on("connection", socketCb);
export { socketServer };


//Middlewares
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(morgan("dev"));
server.use(express.static("public"));


//Handlebars Engine
server.engine("handlebars", engine());
server.set("view engine", "handlebars");
server.set("views", __dirname + "/src/views");

//Endpoints
server.use("/", indexRouter);
server.use(errorHandler);
server.use(pathHandler);
