import express, { response } from "express";
import { PORT, mongoDBURL } from "./config.js ";
import cors from "cors";
import mongoose from "mongoose";
import insurancesRoutes from "./routes/insurancesRoutes.js";
import servicesRoutes from "./routes/servicesRoutes.js";
import usersRoutes from "./routes/usersRoutes.js";
import ordersRoutes from "./routes/ordersRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Welcome to InsuranceService!");
});

app.use("/insurances", insurancesRoutes);
app.use("/services", servicesRoutes);
app.use("/users", usersRoutes);
app.use("/orders", ordersRoutes);

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
