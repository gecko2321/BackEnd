import Service from "./service.js";
//import cartsManager from "../data/fs/CartsManager.js"
//import cartsManager from "../data/memory/CartsManager.js"
//import cartsManager from "../data/mongo/managers/CartsManager.mongo.js"
//import dao from "../data/dao.factory.js"
//const {carts} = dao
import cartsRepository from "../repositories/carts.rep.js";

//const cartsService = new Service(cartsManager);
const cartsService = new Service(cartsRepository);
export const { createService, readService, paginateService, readOneService, updateService, destroyService,destroyAllService } = cartsService