/*
import { Router } from "express";
import apiRouter from "./api/index.api.js";

const indexRouter = Router();

indexRouter.use("/api", apiRouter);

export default indexRouter;
*/
import sendEmail from "../utils/mailing.utils.js";
import CustomRouter from "./CustomRouter.router.js";
import apiRouter from "./api/index.api.js";
import viewsRouter from "./views/index.views.js";
import { fork } from "child_process";

class IndexRouter extends CustomRouter {
  init() {
    this.create("/api/nodemailer", ["PUBLIC"],async(req,res,next)=>{
      try {
        const {email,name} = req.body
        await sendEmail({to:email,name})
        return res.message200("Email Sent")
      } catch (error) {
        next(error)
      }
    })
    this.use("/api", apiRouter);
    this.use("/", viewsRouter);
    this.read("/fork", ["PUBLIC"], (req, res, next) => {
      try {
        const childProcess = fork("./src/processes/sum.proc.js");
        childProcess.send("start");
        childProcess.on("message", (result) => {
          return res.json({ result });
        });
      } catch (error) {
        return next(error);
      }
    });
  }
}

const indexRouter = new IndexRouter();

export default indexRouter.getRouter();
