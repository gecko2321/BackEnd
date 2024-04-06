import { Router } from "express";
import usersManager from "../../data/fs/UsersManager.js";

const usersRouter = Router();

usersRouter.get("/", async (req, res, next) => {
  try {
    const users = await usersManager.read();
    return res.render("users", { users });
  } catch (error) {
    return next(error);
  }
});

usersRouter.get("/register", async (req, res, next) => {
  try {
    const users = await usersManager.read();
    return res.render("usersRegister", { users });
  } catch (error) {
    return next(error);
  }
});

usersRouter.get("/:uid", async (req, res, next) => {
  try {
    const { uid } = req.params;
    const one = await usersManager.readOne(uid);
    return res.render("usersDetail", { user: one });
  } catch (error) {
    return next(error);
  }
});

export default usersRouter;
