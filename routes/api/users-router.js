import express from "express";
import usersController from "../../controllers/users-controller.js";
import valEmptyBody from "../../midelwares/valEmptyBody.js";
import * as userSchema from "../../models/User.js";
import valBody from "../../midelwares/valBody.js";

const usersRouter = express.Router();

const userSubscribeValidate = valBody(userSchema.userSubscribSchema);

usersRouter.post(
  "/",
  valEmptyBody,
  userSubscribeValidate,
  usersController.addUser
);
usersRouter.post("/events", usersController.getUserEvents);

export default usersRouter;
