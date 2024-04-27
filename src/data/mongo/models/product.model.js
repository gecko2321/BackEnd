import { Schema, model } from "mongoose";

const collection = "products";
const schema = new Schema(
  {
    title: { type: String, required: true },
    category: {
      type: String,
      required: true,
      enum: ["Tazas", "Platos", "Combo", "Varios"],
      default: "Varios",
    },
    price: { type: Number, required: true, default: 1 },
    stock: { type: Number, default: 1 },
    photo: {
      type: String,
      default:
        "https://e7.pngegg.com/pngimages/25/936/png-clipart-impruneta-ceramic-terracotta-vase-pottery-terra-cotta-vase-pottery.png",
    },
  },
  {
    timestamps: true,
  }
);

const Product = model(collection, schema);
export default Product;
