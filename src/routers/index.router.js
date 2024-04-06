import { Router } from "express";
import apiRouter from "./api/index.api.js";
import viewsRouter from "./views/index.views.js";

const indexRouter = Router();

//router de api
indexRouter.use("/api", apiRouter);
//router de views-paginas handlebars
indexRouter.use("/", viewsRouter);

export default indexRouter;
