import { createService, destroyService, paginateService, readOneService, readService, updateService } from "../services/products.service.js";

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
    const { category } = req.query;
    const all = await readService(category);
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

async function paginate(req, res, next) {
  try {
    const filter = {};
    if (req.query.product_id) {
      filter.product_id = req.query.product_id;
    }
    const options = {
      limit: req.query.limit || 5,
      page: req.query.page || 1,
    };
    const products = await paginateService({ filter, options });
    // return res.json({
    //   statusCode: 200,
    //   response: products,
    // });
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
      //  return res.json({
      //    statusCode: 200,
      //    response: one,
      //  });
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
    // return res.json({
    //   statusCode: 200,
    //   response: one,
    // });
    res.response200(one);
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
    res.response200(one);
  } catch (error) {
    return next(error);
  }
}

export { create, read, paginate, readOne, update, destroy };
