import mongoose from "mongoose";
import Insurance from "./Insurance";
import Service from "./Service";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: false,
  },
  number: {
    type: Number,
    required: false,
  },
  address: {
    type: String,
    required: false,
  },
  insurances: [{ type: mongoose.Schema.Types.ObjectId, ref: "Insurance" }],
  services: [Service.schema],
});

const User = mongoose.model("User", userSchema);

export default User;
