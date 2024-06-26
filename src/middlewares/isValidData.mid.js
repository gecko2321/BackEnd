import usersManager from "../data/mongo/managers/UsersManager.mongo.js";

async function isValidData(req, res, next) {
  try {
    const { email, password,name,lname } = req.body;
    if (!email || !password || !name || !lname) {
      const error = new Error("Please enter Name, Last Name, email and password!");
      error.statusCode = 400;
      throw error;
    }
    return next();
  } catch (error) {
    return next(error);
  }
}

export default isValidData;
