import express, { response } from "express";
import { PORT, mongoDBURL } from "./config.js ";
import cors from "cors";
import mongoose from "mongoose";
import { Insurance } from "./models/Insurance.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Welcome to InsuranceService!");
});

// POST new insurance
app.post("/insurances", async (req, res) => {
  try {
    if (!req.body.name) {
      return res
        .status(400)
        .send({ message: "Send the name field of the insurance" });
    }
    const newInsurance = {
      name: req.body.name,
    };
    const insurance = await Insurance.create(newInsurance);
    return res.status(201).send(insurance);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// GET all insurances
app.get("/insurances", async (req, res) => {
  try {
    const insurances = await Insurance.find({});

    return res.status(200).json({
      count: insurances.length,
      data: insurances,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// GET insurance by ID
app.get("/insurances/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const insurance = await Insurance.findById(id);

    return res.status(200).json(insurance);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
      console.log(`App is listening on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
