import User from "../models/User.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// generate token
const generateToken = (user) => {
    return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: "1d",
    });
};

// login
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        // 1. Check user
        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            return res
                .status(401)
                .json({ message: "Invalid email or password" });
        }
        // 2. Check password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(403).json({ message: "Invalid credentials" });
        }
        // 3. Check if active
        if (user.status !== "active") {
            return res.status(403).json({ message: "User is inactive" });
        }
        // 4. Generate token
        const token = generateToken(user);
        res.json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    } catch (err) {
        res.status(500).json({ message: "Error while logging in" });
    }
};
