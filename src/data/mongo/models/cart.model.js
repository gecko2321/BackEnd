import { Schema, model, Types } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const collection = "carts";
const schema = new Schema(
  {
    user_id: {
      type: Types.ObjectId,
      required: true,
      index: true,
      ref: "users",
    },
    product_id: {
      type: Types.ObjectId,
      required: true,
      index: true,
      ref: "products",
    },
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

schema.plugin(mongoosePaginate);

schema.pre("find", function () {
  this.populate("user_id") //agregar selectores
});

schema.pre("find", function () {
  this.populate("product_id") //agregar selectores
});

const Cart = model(collection, schema);
export default Cart;
