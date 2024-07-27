//Imports
import express from "express";
import indexRouter from "./src/routers/index.router.js";
import errorHandler from "./src/middlewares/errorHandler.mid.js";
import pathHandler from "./src/middlewares/pathHandler.mid.js";
//import morgan from "morgan";
import { engine } from "express-handlebars";
import __dirname from "./utils.js";
import socketCb from "./src/routers/index.socket.js";
import { createServer } from "http";
import { Server } from "socket.io";
import dbConnect from "./src/utils/dbConnect.util.js";
import cookieParser from "cookie-parser";
import session from "express-session";
//import fileStore from "session-file-store"
import MongoStore from "connect-mongo";
import argsUtil from "./src/utils/args.util.js";
import environment from "./src/utils/env.util.js";
import cors from "cors";
import compression from "express-compression";
import winston from "./src/middlewares/winston.mid.js";
import cluster from "cluster"
import { cpus } from "os";
import configs from "./src/utils/swagger.util.js"
import swaggerJSDoc from "swagger-jsdoc";
import {serve,setup} from "swagger-ui-express"

//Server HTTP
const server = express();
//const port = environment.PORT || argsUtil.p;
const port = argsUtil.p;
const ready = async () => {
  console.log("server ready on port " + port);
  //await dbConnect();
  //hay que incluir la conexion a mongo desde el patron factory
};
const numOfProc = cpus().length

if (cluster.isPrimary) {
  for (let i = 1; i<= numOfProc; i++){
    cluster.fork()
  }
  
  console.log("proceso primario")
} else {
  console.log("proceso worker"+process.pid)
  server.listen(port, ready);
}
const nodeServer = createServer(server);


//Server TCP
const socketServer = new Server(nodeServer);
socketServer.on("connection", socketCb);
export { socketServer };

const specs = swaggerJSDoc(configs)

//Middlewares
server.use(cookieParser(environment.SECRET_COOKIE));
//Para Filestore
//const FileSession = fileStore(session);
/*
server.use(
  session({
    //FileStore
    // store: new FileSession({
    //   path:"./src/data/fs/files/sessions",
    //   ttl: 60 * 60
    // }),
    store: new MongoStore({
      mongoUrl: process.env.MONGO_URI,
      ttl: 60 * 60,
    }),
    secret: process.env.SECRET_SESSION,
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 1000 },
  })
);
*/
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
//server.use(morgan("dev"));
server.use(winston);
server.use(express.static(__dirname + "/public"));
server.use(cors({ origin: true, credentials: true })); //para que funcione react por el tema puertos
server.use(
  compression({
    brotli: { enabled: true, zlib: {} },
  })
);
server.use("/api/docs", serve, setup(specs));
//Handlebars Engine
server.engine("handlebars", engine());
server.set("view engine", "handlebars");
server.set("views", __dirname + "/src/views");

//Endpoints
server.use("/", indexRouter);
server.use(pathHandler);
server.use(errorHandler);

// /*
// console.log(argsUtil)
// console.log(environment
// */
// process.on("exit", (code)=> {
//   console.log("Justo antes")
//   console.log(code)
// })

// process.exit()
