import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();
mongoose.connect(process.env.MONGO_URI!)

import authRoutes from "./routes/auth";


const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/auth", authRoutes);

app.get("/", (req, res) => {
    res.sendStatus(200);
});

app.listen(PORT);