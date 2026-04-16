import express from "express";
import connectDB from "./utils/database.js";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();
dotenv.config();

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

const startServer = async () => {
    await connectDB();
    app.listen(process.env.PORT || 3000, () => {
        console.log("Server started on port 3000");
    });
};

startServer();
