/*
import { Router } from "express";
import productsRouter from "./products.view.js";
import usersRouter from "./users.view.js";
import cartsRouter from "./carts.view.js";

const viewsRouter = Router();

viewsRouter.use("/products", productsRouter);
viewsRouter.use("/users", usersRouter);
viewsRouter.use("/carts", cartsRouter);
viewsRouter.get("/", (req, res, next) => {
  try {
    return res.render("index", { title: "Ceramica Gloria - Bienvenidos" });
  } catch (error) {
    return next(error);
  }
});

export default viewsRouter;
*/

import CustomRouter from "../CustomRouter.router.js";
import productsRouter from "./products.view.js";
import usersRouter from "./users.view.js";
import cartsRouter from "./carts.view.js";

class ViewRouter extends CustomRouter {
  init() {
    this.use("/products", productsRouter);
    this.use("/users", usersRouter);
    this.use("/carts", cartsRouter);
    this.use("/", (req, res, next) => {
      try {
        return res.render("index", { title: "Ceramica Gloria - Bienvenidos" });
      } catch (error) {
        return next(error);
      }
    });
  }
}


const viewsRouter = new ViewRouter();

export default viewsRouter.getRouter();