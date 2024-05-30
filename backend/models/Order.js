import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  otherInfo: {
    type: String,
    required: false,
  },
  services: [{ type: mongoose.Schema.Types.ObjectId, ref: "Service" }],
  timeOfPurchase: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

export const Order = mongoose.model("Order", orderSchema);
