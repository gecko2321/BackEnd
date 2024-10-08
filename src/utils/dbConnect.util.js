import { connect } from "mongoose";
import environment from "./env.util.js";

async function dbConnect() {
  try {
    //console.log(environment.MONGO_URI)
    await connect(environment.MONGO_URI);
    console.log("connected to mongo database of ceramicagloria");
  } catch (error) {
    console.log(error);
  }
}

export default dbConnect;
