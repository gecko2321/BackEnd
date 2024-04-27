import { Schema, model } from "mongoose";

const collection = "carts";
const schema = new Schema(
  {
    user_id: { type: String, required: true },
    product_id: { type: String, required: true },
    quantity: { type: Number, required: true },
    state: {
      type: String,
      required: true,
      enum: ["reserved", "paid", "delivered"],
      default: "reserved",
    },
  },
  {
    timestamps: true,
  }
);

const Cart = model(collection, schema);
export default Cart;
