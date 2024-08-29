import { Router } from "express";
//import productsManager from "../../data/fs/ProductsManager.js";
//import productsManager from "../../data/mongo/managers/ProductsManager.mongo.js";
import { dao } from "../../data/dao.factory.js";

const productsRouter = Router();
const productsDao = dao.products;

productsRouter.get("/", async (req, res, next) => {
  try {
    let products;
    if (req.query.category) {
      products = await productsDao.read({ category: req.query.category });
    } else {
      products = await productsDao.read();
    }
    return res.render("products", { products,title: "Productos" });
  } catch (error) {
    return next(error);
  }
});

productsRouter.get("/real", async (req, res, next) => {
  try {
    const products = await productsDao.read();
    return res.render("productsReal", { products,title: "Carga de Productos" });
  } catch (error) {
    return next(error);
  }
});

productsRouter.get("/me", async (req, res, next) => {
  try {
    const products = await productsDao.read();
    return res.render("productsMe", { products,title: "Mis Productos" });
  } catch (error) {
    return next(error);
  }
});

productsRouter.get("/edit", async (req, res, next) => {
  try {
    const products = await productsDao.read();
    return res.render("productsEdit", { products,title: "Editar Producto" });
  } catch (error) {
    return next(error);
  }
});

productsRouter.get("/:pid", async (req, res, next) => {
  try {
    const { pid } = req.params;
    const one = await productsDao.readOne(pid);
    return res.render("productsDetail", { product: one,title: "Detalle del Producto" });
  } catch (error) {
    return next(error);
  }
});

export default productsRouter;
