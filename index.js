import express from "express";
import "express-async-errors";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import notFoundMiddleware from "./middleware/notFoundMiddleware.js";
import errorMiddleware from "./middleware/errorMiddleware.js";
import connectDB from "./db/connect.js";
// routes
import authRoutes from "./Routes/authRoutes.js";
import medicalRoutes from "./Routes/patientData.js";
import doctorsRoutes from "./Routes/doctorsRoutes.js";

const app = express();

app.use(cookieParser());
app.use(express.json());
app.get("/", (req, res) => {
  // throw new Error("error");
  res.send("basic server setup");
});
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/medical", medicalRoutes);
app.use("/api/v1/doctors", doctorsRoutes);
app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = 3000 || process.env.PORT;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`server is up on port http://localhost:${port}`)
    );
  } catch (error) {
    console.log(error);
  }
};
start();
