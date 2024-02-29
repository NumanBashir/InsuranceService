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
  purchased: {
    type: Boolean,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  variations: [
    {
      type: String,
      required: true,
    },
  ],
  eligibleInsurances: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Insurance" },
  ],
});

const Service = mongoose.model("Service", serviceSchema);

export default Service;
