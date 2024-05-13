import { Schema, model } from "mongoose";
import { handleSaveError, runValidateAtUpdate } from "./hooks.js";
import Joi from "joi";

const heardList = ["social", "friends", "myself"]

const userSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    born: {
      type: String,
      required: true,
    },
    heard: {
      type: String,
      enum: heardList,
    },
        subscribed: [],
  },
  { versionKey: false, timestamps: true }
);

export const userSubscribSchema = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  born: Joi.string().required(),
  heard: Joi.string().required()
})

userSchema.post("save", handleSaveError);
userSchema.pre("findOneAndUpdate", runValidateAtUpdate);
userSchema.post("findOneAndUpdate", handleSaveError);

const User = model("user", userSchema);
export default User;
