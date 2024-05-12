import { Schema, model } from "mongoose";
import { handleSaveError, runValidateAtUpdate } from "./hooks.js";

const heardList = ["social", "friends", "myself"]

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    born: {
      type: Date,
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

userSchema.post("save", handleSaveError);
userSchema.pre("findOneAndUpdate", runValidateAtUpdate);
userSchema.post("findOneAndUpdate", handleSaveError);

const User = model("user", userSchema);
export default User;
