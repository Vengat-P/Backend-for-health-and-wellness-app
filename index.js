import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./Database/dbConfig.js";

//config dot env
dotenv.config();
//declare express
const app = express();

//default middlewares
app.use(cors());
app.use(express.json());
//connect DB
connectDB();
//initalize expres
app.get("/", (req, res) => {
  res.status(200).send("Welcome to API");
});
//declare port
const port = process.env.PORT || 4000;

//Start the server
app.listen(port, () => {
  console.log("server started");
});
