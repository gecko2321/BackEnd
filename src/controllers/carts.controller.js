import { createService, readService, paginateService, readOneService, updateService, destroyService,destroyAllService } from "../services/carts.service.js"

async function create(req, res, next) {
  try {
    const data = req.body;
    const one = await createService(data);
    // return res.json({
    //   statusCode: 201,
    //   message: "CREATED ID: " + one.id,
    // });
    return res.message201("CREATED ID: " + one.id);
  } catch (error) {
    return next(error);
  }
}

async function read(req, res, next) {
  try {
    const { user_id } = req.query;
    if (user_id) {
      const all = await readService({ user_id });
      if (all.length > 0) {
        // return res.json({
        //   statusCode: 200,
        //   message: "READ",
        //   response: all,
        // });
        return res.response200(all);
      }
    }
    const error = new Error("Not found!");
    error.statusCode = 404;
    throw error;
  } catch (error) {
    return next(error);
  }
}

async function paginate(req, res, next) {
  try {
    const filter = {};
    if (req.query.user_id) {
      filter.user_id = req.query.user_id;
    }
    const options = {
      limit: req.query.limit || 4,
      page: req.query.page || 1,
    };
    const cart = await paginateService({ filter, options });
    // return res.json({
    //   statusCode: 200,
    //   response: cart,
    // });
    return res.paginate(cart);
  } catch (error) {
    return next(error);
  }
}

async function readOne(req, res, next) {
  try {
    const { pid } = req.params;
    const one = await readOneService(pid);
    if (one) {
      // return res.json({
      //   statusCode: 200,
      //   response: one,
      // });
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

async function update(req, res, next) {
  try {
    const { pid } = req.params;
    const data = req.body;
    const one = await updateService(pid, data);
    // return res.json({
    //   statusCode: 200,
    //   response: one,
    // });
    return res.response200(one);
  } catch (error) {
    return next(error);
  }
}

async function destroy(req, res, next) {
  try {
    const { pid } = req.params;
    const one = await destroyService(pid);
    // return res.json({
    //   statusCode: 200,
    //   response: one,
    // });
    return res.response200(one);
  } catch (error) {
    return next(error);
  }
}

async function destroyAll(req, res, next) {
  try {
    const { user_id } = req.query;

    if (!user_id) {
      return res.status(400).json({ message: "user_id es requerido" });
    }

    const result = await destroyAllService(user_id);

    if (result.deletedCount === 0) {
      return res
        .status(404)
        .json({ message: "No se encontraron productos para eliminar" });
    }

    return res
      .status(200)
      .json({ message: "Todos los productos han sido eliminados del carrito" });
  } catch (error) {
    return next(error);
  }
}

export { create, read, readOne, update, destroy, paginate, destroyAll };
