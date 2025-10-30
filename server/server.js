import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./configs/mongo.config.js";

const app = express();
connectDB();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from KarigarLink server!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
