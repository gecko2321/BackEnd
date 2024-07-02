import usersManager from "../data/mongo/managers/UsersManager.mongo.js";
import CustomError from "../utils/errors/CustomError.js";
import errors from "../utils/errors/errors.js";

async function isValidData(req, res, next) {
  try {
    const { email, password,name,lname } = req.body;
    if (!email || !password || !name || !lname) {
      //const error = new Error("Please enter Name, Last Name, email and password!");
      //error.statusCode = 400;
      console.log("entré al isvaliddata")
      const error = CustomError.new(errors.regform)
      console.log(error)
      throw error;
    }
    return next();
  } catch (error) {
    return next(error);
  }
}

export default isValidData;
