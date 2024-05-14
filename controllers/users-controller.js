import ctrlWrapper from "../decorators/ctrlWrapper.js";
import User from "../models/User.js";
import Event from "../models/Event.js";
import HttpError from "../helpers/HttpError.js";

const addUser = async (req, res) => {
  const { email, id } = req.body;

  let isUser = await User.findOne({ email });
  console.log(isUser);
  if (isUser) {
    const isSubscribed = isUser.subscribed.find((item) => item === id);
    if (isSubscribed) {
      throw HttpError(409, "You already subscribed");
    } else {
      isUser.subscribed.push(id);
      isUser = await isUser.save();
      res.json(isUser);
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

const getUserEvents = async (req, res) => {
  const { id } = req.body;
  const user = await User.findById(id);
  const events = await Event.find();
  const result = events.filter((event) => user.subscribed.includes(event._id));
  res.json(result);
};

export default {
  addUser: ctrlWrapper(addUser),
  getUserEvents: ctrlWrapper(getUserEvents),
};
