import express from "express";
import { PORT } from "./config.js ";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Welcome to InsuranceService!");
});

app.listen(PORT, () => {
  console.log(`App is listening on port: ${PORT}`);
});
