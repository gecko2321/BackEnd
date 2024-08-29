import { createPaymentService } from "../services/payments.service.js";

const createPayment = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const response = await createPaymentService({ user_id: userId });
    return res.json(response);
  } catch (error) {
    return next(error);
  }
};

export default createPayment;
