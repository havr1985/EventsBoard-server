import express from "express";
import usersController from "../../controllers/users-controller.js";
import isValidId from "../../midelwares/isValidId.js";
import valBody from "../../midelwares/valBody.js";


const usersRouter = express.Router();

usersRouter.post("/:id", isValidId, valBody, usersController.addUser);


export default usersRouter;