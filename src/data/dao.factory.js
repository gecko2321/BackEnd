import argsUtil from "../utils/args.util.js";
import dbConnect from "../utils/dbConnect.util.js";

const persistence = argsUtil.persistence;


let dao = {};
//Objeto que voy a cargar dinamicamente con las importaciones de los managers que correspondan

switch (persistence) {
  case "memory":
    console.log("connected to MEMORY por DAO");
    //lleno dao con las importaciones de memory
        const {default : usersManagerMem } = await import ("./memory/UsersManager.js")
        const {default : productsManagerMem } = await import ("./memory/ProductsManager.js")
        const {default : cartsManagerMem } = await import ("./memory/CartsManager.js")
        //traer todos los managers de todos los recursos
        dao= {users: usersManagerMem, products: productsManagerMem, carts: cartsManagerMem}
        console.log("memory")
    break;
  case "fs":
    console.log("connected to FS por DAO");
    //lleno dao con las importaciones de fs
    const {default : usersManagerFs } = await import ("./fs/UsersManager.js")
    const {default : productsManagerFs } = await import ("./fs/ProductsManager.js")
    const {default : cartsManagerFs } = await import ("./fs/CartsManager.js")
    //traer todos los managers de todos los recursos
    dao= {users: usersManagerFs, products: productsManagerFs, carts: cartsManagerFs}
    console.log("fs")
    break;
  default:
    //console.log("connected to MONGO por DAO");
    //lleno dao con las importaciones de mongo
        dbConnect()
        const {default : usersManagerMongo } = await import ("./mongo/managers/UsersManager.mongo.js")
        const {default : productsManagerMongo } = await import ("./mongo/managers/ProductsManager.mongo.js")
        const {default : cartsManagerMongo } = await import ("./mongo/managers/CartsManager.mongo.js")
    //traer todos los managers de todos los recursos
    dao= {users: usersManagerMongo, products: productsManagerMongo, carts: cartsManagerMongo}
    //por defecto mongo
    break;
}

export default dao;
