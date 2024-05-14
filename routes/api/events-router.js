import express from "express";
import eventsController from "../../controllers/events-controller.js";
import isValidId from "../../midelwares/isValidId.js";

const eventsRouter = express.Router();

eventsRouter.get("/", eventsController.getAll);
eventsRouter.get("/:id", isValidId, eventsController.getById);

export default eventsRouter;
