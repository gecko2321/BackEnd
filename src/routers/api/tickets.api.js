import CustomRouter from "../CustomRouter.router.js";
import { ticket } from "../../controllers/tickets.controller.js";

class TicketsRouter extends CustomRouter {
  init() {
    this.read("/:uid", ["ADMIN", "USER"], ticket);
  }
}

const ticketsRouter = new TicketsRouter();
export default ticketsRouter.getRouter();
