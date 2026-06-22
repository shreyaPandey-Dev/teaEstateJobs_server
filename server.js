import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import jobsRoute from "./routes/jobs.js";

dotenv.config();

const app = express();

// middleware
app.use(cors({
  origin: "*"
}));

app.use(express.json());

// routes
app.use("/jobs", jobsRoute);

// health check
app.get("/", (req, res) => {
  res.send("Tea Estate Jobs API running");
});

// IMPORTANT: Render uses process.env.PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});