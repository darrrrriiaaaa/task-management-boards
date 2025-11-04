import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import boardRouter from "./routes/boardRouter";
import columnRouter from "./routes/columnRouter";
import cardRouter from "./routes/cardRouter";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI!).then(() => console.log("MongoDB connected!")).catch((err) => console.error(err));

app.use("/api/boards", boardRouter);
app.use("/api/columns", columnRouter);
app.use("/api/cards", cardRouter);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));