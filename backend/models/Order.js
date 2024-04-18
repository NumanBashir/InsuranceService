import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },

  otherInfo: {
    type: String,
    required: false,
  },
  services: [{ type: mongoose.Schema.Types.ObjectId, ref: "Service" }],
});

export const Order = mongoose.model("Order", orderSchema);
