import mongoose from "mongoose";
import Order from "./Order"; // Import the Order model

// We can use the User table to prefill the buying process
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
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }], // Reference to orders made by the user
});

const User = mongoose.model("User", userSchema);

export default User;
