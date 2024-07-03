import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import usersManager from "../data/mongo/managers/UsersManager.mongo.js";
import { createHash, verifyHash } from "../utils/hash.util.js";
import { createToken } from "../utils/token.util.js";
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";
import environment from "../utils/env.util.js";
import usersRepository from "../repositories/users.rep.js";
import UsersDTO from "../dto/users.dto.js";
import sendEmail from "../utils/mailing.utils.js";
import CustomError from "../utils/errors/CustomError.js";
import errors from "../utils/errors/errors.js";

passport.use(
  "register",
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
      try {
        //LA ESTRATEGIA NECESARIA PARA REGISTRAR A UN USUARIO
        //QUE CONSTA DE TODO LO QUE VALIDAMOS EN LOS MIDDLEWARES
        if (!email || !password) {
          //const error = new Error("Please enter email and password!");
          //error.statusCode = 400;
          const error = CustomError.new(errors.enter_mail_pass)
          return done(null, null, error);
        }
        //const one = await usersManager.readByEmail(email);
        const one = await usersRepository.readByEmailRepository(email);
        if (one) {
          //const error = new Error("Bad auth from register!");
          //error.statusCode = 401;
          const error = CustomError.new(errors.auth)
          return done(error);
        }
        const hashPassword = createHash(password);        
        req.body.password = hashPassword;
        //const user = await usersManager.create(req.body);
        const data = new UsersDTO(req.body);
        const user = await usersRepository.createRepository(data);
        //despues de crear el usuario debemos enviar el correo con un codigo para la verificacion del usuario, esto esta en el DTO de usuarios
        await sendEmail({ to: email, name: user.name, code: user.verifyCode });
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);
passport.use(
  "login",
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
      try {
        //const one = await usersManager.readByEmail(email);
        const one = await usersRepository.readByEmailRepository(email);
        if (!one) {
          //const error = new Error("Bad auth from login!");
          //error.statusCode = 401;
          
          const error = CustomError.new(errors.auth)
          return done(error);
        }
        const verifyPass = verifyHash(password, one.password);
        const verifyAccount = one.verified;
        //console.log(one)
        //console.log(password)
        
        if (verifyPass && verifyAccount) {
          //req.session.email = email;
          //req.session.online = true;
          //req.session.role = one.role;
          //req.session.photo = one.photo;
          //req.session.user_id = one._id;
          const user = {
            email,
            role: one.role,
            photo: one.photo,
            _id: one._id,
            online: true,
          };
          const token = createToken(user);
          user.token = token;
          return done(null, user);
          //agrega la propeidad USER al objeto de requerimientos
          //esa propiedad user tiene todas las propiedades que estamos definiendo en el objeto correspondiente
        }
        const error = new Error("Invalid credentials");
        error.statusCode = 401;
        return done(error);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  "jwt",
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => req?.cookies["token"],
      ]),
      secretOrKey: environment.SECRET_JWT,
    },
    (data, done) => {
      try {
        if (data) {          
          return done(null, data);
        } else {
          const error = new Error("Forbidden from jwt!");
          error.statusCode = 403;
          return done(error);
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);

export default passport;
