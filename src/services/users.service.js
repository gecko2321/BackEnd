import Service from "./service.js";
//import usersManager from "../data/memory/UsersManager.js";
//import usersManager from "../data/fs/UsersManager.js"
//import usersManager from "../data/mongo/managers/UsersManager.mongo.js"
//import dao from "../data/dao.factory.js"
//const {users} = dao
import usersRepository from "../repositories/users.rep.js";

const usersService = new Service(usersRepository);
//const usersService = new Service(usersManager);
export const {
  createService,
  readService,
  paginateService,
  readOneService,
  readByEmailService,
  updateService,
  destroyService,
} = usersService;
