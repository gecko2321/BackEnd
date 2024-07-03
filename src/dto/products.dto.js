import argsUtil from "../utils/args.util.js";
import crypto from "crypto";

const persistence = argsUtil.persistence;

class ProductsDTO {
  constructor(data) {
    persistence !== "mongo" && (this._id = crypto.randomBytes(12).toString("hex"));
    this.title = data.title;
    this.category = data.category;
    this.price = data.price || 1;
    this.stock = data.stock || 10;
    this.photo = data.photo || "https://d22fxaf9t8d39k.cloudfront.net/f1901a40e42e5a23cfd96f43a6f2d7f7284f2d641c3b04d8e607479c2b8094c777180.jpeg";
    persistence !== "mongo" && (this.createdAt = new Date());
    persistence !== "mongo" && (this.updatedAt = new Date());
  }
}

export default ProductsDTO;
