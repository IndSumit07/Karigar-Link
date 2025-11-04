import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./configs/mongo.config.js";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import rfqRouter from "./routes/rfq.routes.js";

const app = express();
connectDB();
const PORT = process.env.PORT || 4000;

app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from KarigarLink server!");
});
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/rfq", rfqRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
