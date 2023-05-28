import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  username: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: false },
  oauthid: { type: String, required: false },
});

const UserModel = mongoose.model("user", userSchema);

export = UserModel;
