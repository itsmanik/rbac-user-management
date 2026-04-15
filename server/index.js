import express from "express";
import connectDB from "./utils/database.js";
import dotenv from "dotenv";

const app = express();
dotenv.config();

app.use(express.json());

const startServer = async () => {
    await connectDB();
    app.listen(process.env.PORT || 3000, () => {
        console.log("Server started on port 3000");
    });
};

startServer();
