import ctrlWrapper from "../decorators/ctrlWrapper.js";
import User from "../models/User.js";
import HttpError from "../helpers/HttpError.js"

const addUser = async (req, res) => {
  const { id } = req.params;
  const { email } = req.body;

  let isUser = await User.findOne({ email });
  console.log(isUser);
  if (isUser) {
    const isSubscribed = isUser.subscribed.find((item) => item === id);
    if (isSubscribed) {
      throw HttpError(409, "You already subscribed")
    } else {
      isUser.subscribed.push(id);
      isUser = await isUser.save();
      res.json(isUser)
    }
  } else {
    let user = await User.create({
      ...req.body,
    });
    user.subscribed.push(id);
    user = await user.save();
    res.json(user);
  }

  
};

export default {
  addUser: ctrlWrapper(addUser),
};
