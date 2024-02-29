import mongoose from "mongoose";

const insuranceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

export const Insurance = mongoose.model("Insurance", insuranceSchema);
