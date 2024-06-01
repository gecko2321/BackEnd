/*
import { Router } from "express";
import apiRouter from "./api/index.api.js";

const indexRouter = Router();

indexRouter.use("/api", apiRouter);

export default indexRouter;
*/
import CustomRouter from "./CustomRouter.router.js";
import apiRouter from "./api/index.api.js";
import viewsRouter from "./views/index.views.js"

class IndexRouter extends CustomRouter {
    init() {
        this.use("/api", apiRouter)
        this.use("/", viewsRouter)
    }
}

const indexRouter = new IndexRouter()

export default indexRouter.getRouter()