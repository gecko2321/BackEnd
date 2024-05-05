import { Router } from "express";
import cartsManager from "../../data/mongo/managers/CartsManager.mongo.js";

const cartsRouter = Router()

cartsRouter.get("/", async (req, res, next) => {
    try {
      const carts = await cartsManager.read();
      return res.render("cart", { carts });
    } catch (error) {
      return next(error);
    }
  });

  export default cartsRouter;
