import argsUtil from "../utils/args.util.js";
import dbConnect from "../utils/dbConnect.util.js";
import { logger, loggerdev } from "../utils/winston.util.js";

const persistence = argsUtil.persistence;
const env = argsUtil.env;

let dao = {};

// Asigna el logger adecuado basado en el entorno
let activeLogger = env === "prod" ? logger : loggerdev;

switch (persistence) {
  case "memory":
    console.log("connected to MEMORY por DAO");
    const { default: usersManagerMem } = await import(
      "./memory/UsersManager.js"
    );
    const { default: productsManagerMem } = await import(
      "./memory/ProductsManager.js"
    );
    const { default: cartsManagerMem } = await import(
      "./memory/CartsManager.js"
    );
    dao = {
      users: usersManagerMem,
      products: productsManagerMem,
      carts: cartsManagerMem,
    };
    console.log("memory");
    break;
  case "fs":
    console.log("connected to FS por DAO");
    const { default: usersManagerFs } = await import("./fs/UsersManager.js");
    const { default: productsManagerFs } = await import(
      "./fs/ProductsManager.js"
    );
    const { default: cartsManagerFs } = await import("./fs/CartsManager.js");
    dao = {
      users: usersManagerFs,
      products: productsManagerFs,
      carts: cartsManagerFs,
    };
    console.log("fs");
    break;
  default:
    dbConnect();
    const { default: usersManagerMongo } = await import(
      "./mongo/managers/UsersManager.mongo.js"
    );
    const { default: productsManagerMongo } = await import(
      "./mongo/managers/ProductsManager.mongo.js"
    );
    const { default: cartsManagerMongo } = await import(
      "./mongo/managers/CartsManager.mongo.js"
    );
    dao = {
      users: usersManagerMongo,
      products: productsManagerMongo,
      carts: cartsManagerMongo,
    };
    break;
}

export { dao, activeLogger };
