import jwt from "jsonwebtoken";
import User from "../models/User.js";
import dotenv from "dotenv";

dotenv.config();

const protect = async (req, res, next) => {
    try {
        let token;
        // 1. Get token from header
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
        ) {
            token = req.headers.authorization.split(" ")[1];
        }
        // 2. If no token
        if (!token) {
            return res
                .status(401)
                .json({ message: "Not authorized, to token" });
        }
        // 3. Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // 4. Get user from db (optional but good practice)
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }
        // 5. Attach to request
        req.user = user;
        next();
    } catch (err) {
        return res
            .status(401)
            .json({ message: "Not authorized, invalid token" });
    }
};

export default protect;
