import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  services: [{ type: mongoose.Schema.Types.ObjectId, ref: "Service" }], // Array of service IDs
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
