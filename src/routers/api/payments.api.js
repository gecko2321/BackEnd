import CustomRouter from "../CustomRouter.router.js";
import createPayment from "../../controllers/payments.controller.js";

class PaymentsRouter extends CustomRouter {
  init() {
    this.create("/checkout", ["USER", "ADMIN","PREM"], createPayment);
  }
}

const paymentsRouter = new PaymentsRouter();
export default paymentsRouter.getRouter();

/*
import { Router } from "express";
import createPayment from "../../controllers/payments.controller.js"

const paymentsRouter = Router();

paymentsRouter.post("/checkout", createPayment);

export default paymentsRouter;
*/
