import CustomRouter from "../CustomRouter.router.js";
import { Router } from "express";
//import usersManager from "../../data/mongo/managers/UsersManager.mongo.js";
import isValidData from "../../middlewares/isValidData.mid.js";
//import isValidEmail from "../../middlewares/isValidEmail.mid.js";
//import isValidUser from "../../middlewares/isValidUser.mid.js";
//import isValidPassword from "../../middlewares/isValidPassword.mid.js";
//import createHashPassword from "../../middlewares/createHashPassword.mid.js";
import passport from "../../middlewares/passport.mid.js";
import isAuth from "../../middlewares/isAuth.mid.js";
import passportCb from "../../middlewares/passportCb.mid.js";

class SessionsRouter extends CustomRouter {
  init() {
    this.create(
      "/register",
      ["PUBLIC"],
      isValidData,
      //isValidEmail,
      //createHashPassword,
      //passport.authenticate("register", { session: false }),
      passportCb("register"),
      async (req, res, next) => {
        try {
          //se ejecuta en passport
          //const data = req.body;
          //await usersManager.create(data);
//          return res.json({ statusCode: 201, message: "Registered!" });
          return res.message201("Registered!");
        } catch (error) {
          return next(error);
        }
      }
    );
    this.create(
      "/login",
      ["PUBLIC"],
      //se ejecuta en passport
      //isValidUser,
      //isValidPassword,
      //passport.authenticate("login", { session: false }),
      passportCb("login"),
      async (req, res, next) => {
        try {
          // const { email } = req.body;
          // const one = await usersManager.readByEmail(email);
          // req.session.email = email;
          // req.session.online = true;
          // req.session.role = one.role;
          // req.session.user_id = one._id;
          return res
            .cookie("token", req.user.token, { signedCookie: true })
            .json({
              statusCode: 200,
              message: "Logged in!",
              //user_id: one._id,
              //token: req.user.token
            });
        } catch (error) {
          return next(error);
        }
      }
    );
    this.read(
      "/online",
      ["USER", "ADMIN"],
      //passport.authenticate("jwt", { session: false }),
      passportCb("jwt"),
      async (req, res, next) => {
        try {
          //console.log(req.user._id)
          //if (req.session.online) {
          if (req.user.online) {
            return res.json({
              statusCode: 200,
              message: "Is onlineeee!",
              user_id: req.user._id,
              //user_id: "66461d58be24b4822e92d391"
            });
          }

          return res.json({
            statusCode: 401,
            message: "Bad auth!",
          });
        } catch (error) {
          return next(error);
        }
      }
    );
    this.create(
      "/signout",
      ["USER", "ADMIN"],
      passportCb("jwt"),
      (req, res, next) => {
        try {
          console.log(req.user);
          if (req.user.email) {
            //req.session.destroy();
            res.clearCookie("token");
            // return res.json({ statusCode: 200, message: "Signed out!" });
            return res.message200("Signed out!")
          }
          const error = new Error("Invalid credentials from signout");
          error.statusCode = 401;
          throw error;
        } catch (error) {
          return next(error);
        }
      }
    );
  }
}

const sessionsRouter = new SessionsRouter();
export default sessionsRouter.getRouter();
