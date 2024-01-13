import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

dotenv.config({
  path: "config/process.env",
});

// Connect Database
connectDB();

const app = express();

app.get("/", (req, res) => res.send("API Running"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
