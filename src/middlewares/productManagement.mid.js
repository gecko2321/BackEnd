import Product from "../data/mongo/models/product.model.js";
import { readOneService } from "../services/products.service.js";

async function productManagement(req, res, next) {
  try {
    const { role, _id: userId } = req.user;
    const { pid } = req.params;
    //console.log(pid);
    // If user is an admin, allow management of any product
    if (role === 1) {
      //console.log("rol 1")
      return next();
    }

    // If user is a premium user, check if they own the product
    if (role === 2) {
      //console.log("rol 2")
      //console.log(pid)
      const product = await readOneService(pid);
      //console.log(product)
      if (!product) {
        return res.error404();
      }

      if (product.supplier_id.toString() !== userId.toString()) {
        return res.error403(); // Forbidden
      }

      return next();
    }

    // If the user is neither an admin nor a premium user, deny access
    return res.error403();
  } catch (error) {
    return next(error);
  }
}

export default productManagement;
