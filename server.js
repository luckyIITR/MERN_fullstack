import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
// import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import auth from "./routes/api/auth.js"
import profile from "./routes/api/profile.js"
import post from "./routes/api/post.js"



dotenv.config({
  path: "config/process.env",
});
const app = express();
app.use(cors());
// app.use(cookieParser());
app.use(express.json());
app.use(morgan("dev"));

// Connect Database
connectDB();

// Define Routes
app.use('/api/auth', auth);
app.use('/api/profile', profile);
app.use('/api/post', post);


app.get("/", (req, res) => res.send("API Running"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
