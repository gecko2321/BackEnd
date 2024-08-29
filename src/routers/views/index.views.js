import CustomRouter from "../CustomRouter.router.js";
import productsRouter from "./products.view.js";
import usersRouter from "./users.view.js";
import cartsRouter from "./carts.view.js";

class ViewRouter extends CustomRouter {
  init() {
    this.use("/paymentSuccess", (req, res, next) => {
      try {
        return res.render("paymentSuccess");
      } catch (error) {
        return next(error);
      }
    });
    this.use("/nosotros", (req, res, next) => {
      try {
        return res.render("nosotros", { title: "Nosotros" });
      } catch (error) {
        return next(error);
      }
    });
    this.use("/fabricacion", (req, res, next) => {
      try {
        return res.render("fabricacion", { title: "Fabricacion" });
      } catch (error) {
        return next(error);
      }
    });
    this.use("/contacto", (req, res, next) => {
      try {
        return res.render("contacto", { title: "Contacto" });
      } catch (error) {
        return next(error);
      }
    });
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
