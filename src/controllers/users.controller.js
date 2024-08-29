import { createService, destroyService, paginateService, readOneService, readService, updateService } from "../services/users.service.js";

class UsersController {
  async create(req, res, next) {
    try {
      const data = req.body;
      //const one = await usersManager.create(data);
      const one = await createService(data);
      // return res.json({
      //   statusCode: 201,
      //   message: "CREATED ID: " + one.id,
      // });
      return res.message201("CREATED ID: " + one._id);
    } catch (error) {
      return next(error);
    }
  }

  async read(req, res, next) {
    try {
      const { role } = req.query;
      const all = await readService(role);
      if (all.length > 0) {
        // return res.json({
        //   statusCode: 200,
        //   response: all,
        // });
        return res.response200(all);
      } else {
        const error = new Error("Not found!");
        error.statusCode = 404;
        throw error;
      }
    } catch (error) {
      return next(error);
    }
  }

  async readOne(req, res, next) {
    try {
      const { uid } = req.params;
      const one = await readOneService(uid);
      if (one) {
        //  return res.json({
        //    statusCode: 200,
        //    response: one,
        //  });
        console.log(one)
        return res.response200(one);
      } else {
        const error = new Error("Not found!");
        error.statusCode = 404;
        throw error;
      }
    } catch (error) {
      return next(error);
    }
  }

  async update(req, res, next) {
    try {
      const { uid } = req.params;
      const data = req.body;
      const one = await updateService(uid, data);
      // return res.json({
      //   statusCode: 200,
      //   response: one,
      // });
      return res.response200(one);
    } catch (error) {
      return next(error);
    }
  }

  async destroy(req, res, next) {
    try {
      const { uid } = req.params;
      const one = await destroyService(uid);
      // return res.json({
      //   statusCode: 200,
      //   response: one,
      // });
      return res.response200(one);
    } catch (error) {
      return next(error);
    }
  }

  async paginate(req, res, next) {
    try {
      const filter = {};
      const opts = {};
      const all = await paginateService({ filter, opts });
      if (all.length > 0) {
        // return res.json({
        //   statusCode: 200,
        //   response: all,
        // });
        return res.response200(all);
      } else {
        const error = new Error("Not found!");
        error.statusCode = 404;
        throw error;
      }
    } catch (error) {
      return next(error);
    }
  }
}

const usersController = new UsersController();
const { create, read, readOne, update, destroy, paginate } = usersController;
export { create, read, readOne, update, destroy, paginate };
