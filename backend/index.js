import express from "express";
import { PORT } from "./config.js ";
import cors from "cors";
import pool from "./db.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Welcome to InsuranceService!");
});

app.get("/services", async (req, res) => {
  try {
    const allServices = await pool.query("SELECT * FROM service");
    console.log(allServices.rows); // Log the data to the console
    res.json(allServices.rows); // Send the data as JSON to the client
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

app.listen(PORT, () => {
  console.log(`App is listening on port: ${PORT}`);
});
