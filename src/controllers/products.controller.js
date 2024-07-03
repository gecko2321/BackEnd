import { createService, destroyService, paginateService, readOneService, readService, updateService } from "../services/products.service.js";

async function create(req, res, next) {
  try {
    const data = req.body;
    const one = await createService(data);
    return res.message201("CREATED ID: " + one._id);
  } catch (error) {
    return next(error);
  }
}

async function read(req, res, next) {
  try {
    const { category } = req.query;
    const all = await readService(category);
    if (all.length > 0) {
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

async function paginate(req, res, next) {
  try {
    const filter = {};
    // if (req.query.product_id) {
    //   filter.product_id = req.query.product_id;
    // }
    if (req.query.category) {
      filter.category = req.query.category; // Cambiar a category si así está en tu modelo
  }
    const options = {
      limit: req.query.limit || 9,
      page: req.query.page || 1,
      sort: "title"
    };
    const products = await paginateService({ filter, options });
    return res.paginate(products);
  } catch (error) {
    return next(error);
  }
}

async function readOne(req, res, next) {
  try {
    const { pid } = req.params;
    const one = await readOneService(pid);
    if (one) {
      res.response200(one);
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
    res.response200(one);
  } catch (error) {
    return next(error);
  }
}

async function destroy(req, res, next) {
  try {
    const { pid } = req.params;
    const one = await destroyService(pid);
    res.response200(one);
  } catch (error) {
    return next(error);
  }
}

export { create, read, paginate, readOne, update, destroy };
