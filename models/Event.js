import { Schema, model } from "mongoose";
import { handleSaveError, runValidateAtUpdate } from "./hooks.js";

const eventSchema = new Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  date: {
    type: String,
  },
  organizer: {
    type: String,
  },
}, { versionKey: false, timestamps: true });

eventSchema.post("save", handleSaveError);
eventSchema.pre("findOneAndUpdate", runValidateAtUpdate);
eventSchema.post("findOneAndUpdate", handleSaveError);

const Event = model('event', eventSchema);
export default Event;


