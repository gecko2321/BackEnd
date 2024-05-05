import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const collection = "users";
const schema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: Number, default: 0 },
    age: { type: Number, default: 18 },
    photo: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png",
    },
  },
  {
    timestamps: true,
  }
);

schema.plugin(mongoosePaginate);

const User = model(collection, schema);
export default User;
