
import CustomRouter from "../CustomRouter.router.js";
import productsRouter from "./products.api.js";
import cartsRouter from "./carts.api.js";
import usersRouter from "./users.api.js";
import sessionsRouter from "./sessions.api.js";
import ticketsRouter from "./tickets.api.js";
import loggersRouter from "./loggers.api.js";
import paymentsRouter from "./payments.api.js"

class ApiRouter extends CustomRouter {
  init() {
    this.use("/products", productsRouter);
    this.use("/carts", cartsRouter);
    this.use("/users", usersRouter);
    this.use("/sessions", sessionsRouter);
    this.use("/tickets", ticketsRouter);
    this.use("/loggers", loggersRouter);
    this.use("/payments",paymentsRouter)
  }
}

const apiRouter = new ApiRouter();

export default apiRouter.getRouter();