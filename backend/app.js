import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
// import { fetchCoordinatesFromAddress } from "./libs/fetchCoordinatesFromAddress.js";
import { connectToDB } from "./libs/db.js";

// Initialize app
dotenv.config();
const app = express();
mongoose.pluralize(null);

app.use(cors());
app.options("*", cors());

// Middleware
app.use(express.json());
app.use(morgan("tiny"));

// Routes
import feedbackRoutes from "./routes/feedback.js";
import hospitalRoutes from "./routes/hospital.js";
import appointmentRoutes from "./routes/appointment.js";
import usersRoutes from "./routes/user.js";
import billingRoutes from "./routes/billing.js";
import labtestRoutes from "./routes/labtest.js";
import prescriptionRoutes from "./routes/prescription.js";

const api = process.env.API_URL;

// Static files
app.use("/public", express.static("public"));

// Route middlewares
app.use(`${api}/appointment`, appointmentRoutes);
app.use(`${api}/hospital`, hospitalRoutes);
app.use(`${api}/feedback`, feedbackRoutes);
app.use(`${api}/users`, usersRoutes);
app.use(`${api}/billing`, billingRoutes);
app.use(`${api}/labtest`, labtestRoutes);
app.use(`${api}/prescription`, prescriptionRoutes);

// Connect to database
connectToDB();

// Fetch coordinates example
// (async () => {
//   try {
//     const res = await fetchCoordinatesFromAddress("berlin");
//     console.log(res);
//   } catch (error) {
//     console.log(error);
//   }
// })();

// Start server

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`The server 🙈 is listening on port ${PORT}`);
});
