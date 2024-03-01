import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  variations: [
    {
      type: String,
      required: false,
    },
  ],
  eligibleInsurances: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Insurance" },
  ],
});

export const Service = mongoose.model("Service", serviceSchema);
