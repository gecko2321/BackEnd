import { Router } from "express";
//import cartsManager from "../../data/mongo/managers/CartsManager.mongo.js";
import dao from "../../data/dao.factory.js";

const cartsRouter = Router()
const cartsDao = dao.carts

cartsRouter.get("/", async (req, res, next) => {
    try {
      const carts = await cartsDao.read();
      return res.render("cart", { carts });
    } catch (error) {
      return next(error);
    }
  });

  export default cartsRouter;
