import {
  readByEmailService,
  updateService,
} from "../services/users.service.js";
import { createHash } from "../utils/hash.util.js";
import { sendEmailRestorePassword } from "../utils/mailing.utils.js";

class SessionsController {
  async register(req, res, next) {
    try {
      return res.message201("Registered!");
    } catch (error) {
      return next(error);
    }
  }

  async login(req, res, next) {
    try {
      return res
        .cookie("token", req.user.token, { signedCookie: true })
        .message200("Logged in!");
    } catch (error) {
      return next(error);
    }
  }

  async online(req, res, next) {
    try {
      //console.log(req.user.online)
      if (req.user.online) {
        return res.json({
          statusCode: 200,
          message: "Is onlineeee!",
          user_id: req.user._id,
          role: req.user.role,
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

  async signout(req, res, next) {
    try {
      console.log(req.user);
      if (req.user.email) {
        res.clearCookie("token");
        return res.message200("Signed out!");
      }
      const error = new Error("Invalid credentials from signout");
      error.statusCode = 401;
      throw error;
    } catch (error) {
      return next(error);
    }
  }

  async verify(req, res, next) {
    const { email, code } = req.body;
    const one = await readByEmailService(email);
    const verified = code === one.verifyCode;
    //console.log (one)
    //console.log (code)
    if (verified) {
      updateService(one._id, { verified });
      return res.message200("Verified User");
    } else {
      return res.error400("Invalid Credentials");
    }
  }

  async restorePassword(req, res, next) {
    const { email, code, newpassword } = req.body;
    const one = await readByEmailService(email);
    const verified = code === one.verifyCode;
    //console.log (one)
    //console.log (code)
    if (verified) {
      console.log(one);
      console.log(newpassword);
      const newpasswordhash = createHash(newpassword);
      console.log(newpasswordhash);
      updateService(one._id, { password: newpasswordhash });
      return res.message200("Password Restored");
    } else {
      return res.error400("Invalid Credentials");
    }
  }

  async sendCodeToRestore(req, res, next) {
    const { email } = req.body;
    const one = await readByEmailService(email);
    const verified = email === one.email;
    //console.log (one)
    //console.log (code)
    if (verified) {
      await sendEmailRestorePassword({
        to: email,
        name: one.name,
        code: one.verifyCode,
      });
      return res.message200("Email sent");
    } else {
      return res.error400("Invalid Credentials");
    }
  }
}

const sessionsController = new SessionsController();
const {
  register,
  login,
  online,
  signout,
  verify,
  restorePassword,
  sendCodeToRestore,
} = sessionsController;
export {
  register,
  login,
  online,
  signout,
  verify,
  restorePassword,
  sendCodeToRestore,
};
