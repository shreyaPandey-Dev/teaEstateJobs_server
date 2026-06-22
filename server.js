import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import jobsRoute from "./routes/jobs.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/jobs", jobsRoute);

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});