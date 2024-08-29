import { Schema, model, Types } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const collection = "products";
const schema = new Schema(
  {
    title: { type: String, required: true },
    category: {
      type: String,
      required: true,
      enum: ["Tazas", "Platos", "Combo", "Jardineria", "Varios"],
      default: "Varios",
    },
    price: { type: Number, required: true, default: 1 },
    stock: { type: Number, default: 1 },
    photo: {
      type: String,
      default:
        "https://d22fxaf9t8d39k.cloudfront.net/f1901a40e42e5a23cfd96f43a6f2d7f7284f2d641c3b04d8e607479c2b8094c777180.jpeg",
    },
    supplier_id: {
      type: Types.ObjectId,
      required: true,
      index: true,
      ref: "users",
    },
  },
  {
    timestamps: true,
  }
);

schema.plugin(mongoosePaginate);

schema.pre("find", function () {
  this.populate("supplier_id"); //agregar selectores
});

const Product = model(collection, schema);
export default Product;
