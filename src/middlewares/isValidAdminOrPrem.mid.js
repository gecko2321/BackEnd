async function isValidAdminOrPrem(req, res, next) {
  try {
    const { role } = req.user;
    if (role === 1 || role === 2) {
      return next();
    }
    const error = new Error("Forbidden Not Admin or Prem");
    error.statusCode = 403;
    throw error;
  } catch (error) {
    return next(error);
  }
}

export default isValidAdminOrPrem;
