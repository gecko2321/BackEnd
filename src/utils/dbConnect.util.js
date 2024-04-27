import { connect } from "mongoose";

async function dbConnect() {
  try {
    await connect(process.env.MONGO_URI);
    console.log("connected to mongo database of ceramicagloria");
  } catch (error) {
    console.log(error);
  }
}

export default dbConnect;
