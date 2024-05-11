import ctrlWrapper from "../decorators/ctrlWrapper.js";
import User from "../models/User.js";



const addUser = async (req, res) => {
  const { id } = req.params;
  const result = await User.create({
    ...req.body,
    owner: id,
  });
  res.json(result);
};



export default {
  addUser: ctrlWrapper(addUser),
};