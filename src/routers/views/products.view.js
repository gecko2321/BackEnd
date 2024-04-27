import { Router } from "express";
import productsManager from "../../data/fs/ProductsManager.js";
//import productsManager from "../../data/mongo/ProductsManager.mongo.js";


const productsRouter = Router();

productsRouter.get("/", async (req, res, next) => {
  try {
    const products = await productsManager.read();
    return res.render("products", { products });
  } catch (error) {
    return next(error);
  }
});

productsRouter.get("/real", async (req, res, next) => {
  try {
    const products = await productsManager.read();
    return res.render("productsReal", { products });
  } catch (error) {
    return next(error);
  }
});

productsRouter.get("/:pid", async (req, res, next) => {
  try {
    const { pid } = req.params;
    const one = await productsManager.readOne(pid);
    return res.render("productsDetail", { product: one });
  } catch (error) {
    return next(error);
  }
});

export default productsRouter;
