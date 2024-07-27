import { Types } from "mongoose";
import cartsManager from "../data/mongo/managers/CartsManager.mongo.js";
class TicketsController {
  async ticket(req, res, next) {
    try {
      const { uid } = req.params;
      const ticket = await cartsManager.aggregate([
        {
          $match: {
            user_id: new Types.ObjectId(uid),
          },
        },
        {
          $lookup: {
            foreignField: "_id",
            from: "products",
            localField: "product_id",
            as: "product_id",
          },
        },
        {
          $replaceRoot: {
            newRoot: {
              $mergeObjects: [{ $arrayElemAt: ["$product_id", 0] }, "$$ROOT"],
            },
          },
        },
        { $set: { subTotal: { $multiply: ["$quantity", "$price"] } } },
        { $group: { _id: "$user_id", total: { $sum: "$subTotal" } } },
        {
          $project: {
            _id: 0,
            user_id: "$_id",
            total: "$total",
            date: new Date(),
          },
        },
        { $merge: { into: "tickets" } },
      ]);

      // return res.json({
      //   statusCode: 200,
      //   response: ticket,
      // });
      return res.response200(ticket);
    } catch (error) {
      return next(error);
    }
  }
  async readOne(req, res, next) {
    try {
      const { uid } = req.params;
      const one = await readOneService(uid);
      if (one) {
        return res.response200(one);
      } else {
        const error = new Error("Not found!");
        error.statusCode = 404;
        throw error;
      }
    } catch (error) {
      return next(error);
    }
  }
}

const ticketsController = new TicketsController();
const { ticket,readOne } = ticketsController;
export { ticket,readOne };
