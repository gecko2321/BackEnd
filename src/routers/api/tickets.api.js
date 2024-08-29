import CustomRouter from "../CustomRouter.router.js";
import { readOne, ticket } from "../../controllers/tickets.controller.js";

class TicketsRouter extends CustomRouter {
  init() {
    this.read("/:uid", ["ADMIN", "USER","PREM"], ticket);
    //this.read("/:uid", ["ADMIN", "USER"], readOne)
  }
}

const ticketsRouter = new TicketsRouter();
export default ticketsRouter.getRouter();
