import HttpError from "../helpers/HttpError.js";

const valEmptyBody = (req, res, next) => {
  const { length } = Object.keys(req.body);
  if (!length) {
    return next(HttpError(400, "Body must have fields !"));
  }
  next();
};

export default valEmptyBody;