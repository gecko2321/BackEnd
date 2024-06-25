import Service from "./service.js";
//import productsManager from "../data/fs/ProductsManager.js"
//import productsManager from "../data/memory/ProductsManager.js"
//import productsManager from "../data/mongo/managers/ProductsManager.mongo.js"
//import dao from "../data/dao.factory.js"
//const {products} = dao

import productsRepository from "../repositories/products.rep.js";
//const productsService = new Service(productsManager);
const productsService = new Service(productsRepository);
export const { createService, readService, paginateService, readOneService, updateService, destroyService } = productsService