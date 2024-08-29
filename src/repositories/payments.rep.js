import Stripe from "stripe";
import cartsManager from "../data/mongo/managers/CartsManager.mongo.js";
import CheckoutProduct from "../dto/checkoutProducts.dto.js";
import argsUtil from "../utils/args.util.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const createPaymentRepository = async (user_id) => {
  try {
    let productsOnCart = await cartsManager.read(user_id);
    productsOnCart = productsOnCart.map(
      (product) => new CheckoutProduct(product)
    );
    const line_items = productsOnCart;
    const mode = "payment";
    //const success_url = "http://localhost:8080/paymentSuccess"; //Configurar a criterio
    const port = argsUtil.p
    const success_url =  `http://localhost:${port}/paymentSuccess` ; //Configurar a criterio
    const intent = await stripe.checkout.sessions.create({
      line_items,
      mode,
      success_url,
    });
    return intent;
  } catch (error) {
    throw error;
  }
};

export { createPaymentRepository };
