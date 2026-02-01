import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import postRoutes from "./routes/posts.routes.js";
import userRoutes from "./routes/user.routes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());


app.use(postRoutes);
const start = async () => {
  const connestDB = await mongoose.connect(
    "mongodb+srv://aditianarase_db_user:PjUz4PaWTMC0gxzP@cluster0.holfnjr.mongodb.net/?appName=Cluster0"
  );

  app.listen(9090, () => {
    console.log("Server is running on port 9090");
  });
}
start();
