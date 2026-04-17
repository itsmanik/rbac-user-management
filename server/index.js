import express from "express";
import connectDB from "./utils/database.js";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import User from "./models/User.js";
import cors from "cors";

const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());

// Temporary route to create an admin user
app.get("/create-admin", async (req, res) => {
  try {
    const existing = await User.findOne({ email: "admin@gmail.com" });

    if (existing) {
      return res.json({ message: "Admin already exists" });
    }

    const admin = await User.create({
      name: "Admin",
      email: "admin@gmail.com",
      password: "pass@admin",
      role: "admin",
    });

    res.json({
      message: "Admin created",
      admin,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating admin" });
  }
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

const startServer = async () => {
  await connectDB();
  app.listen(process.env.PORT || 3000, () => {
    console.log("Server started on port 3000");
  });
};

startServer();
