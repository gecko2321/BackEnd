class SessionsController {
  async register(req, res, next) {
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

  async login(req, res, next) {
    try {
      // const { email } = req.body;
      // const one = await usersManager.readByEmail(email);
      // req.session.email = email;
      // req.session.online = true;
      // req.session.role = one.role;
      // req.session.user_id = one._id;
      return res.cookie("token", req.user.token, { signedCookie: true }).json({
        statusCode: 200,
        message: "Logged in!",
        //user_id: one._id,
        //token: req.user.token
      });
    } catch (error) {
      return next(error);
    }
  }

  async online(req, res, next) {
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

  signout(req, res, next) {
    try {
      console.log(req.user);
      if (req.user.email) {
        //req.session.destroy();
        res.clearCookie("token");
        // return res.json({ statusCode: 200, message: "Signed out!" });
        return res.message200("Signed out!");
      }
      const error = new Error("Invalid credentials from signout");
      error.statusCode = 401;
      throw error;
    } catch (error) {
      return next(error);
    }
  }
}

const sessionsController = new SessionsController();
const { register, login, online, signout } = sessionsController;
export { register, login, online, signout };
