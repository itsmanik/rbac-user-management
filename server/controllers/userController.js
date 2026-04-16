import User from "../models/User.js";

// Get all users
export const getUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password");
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

// Create a new user
export const createUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const user = await User.create({ name, email, password, role });
        res.status(201).json({ message: "User created", user });
    } catch (err) {
        res.status(500).json({ message: "Error creating user" });
    }
};

// Update an user
export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedUser = await User.findByIdAndUpdate(id, req.body, {
            new: true,
        }).select("-password");
        res.json(updateUser);
    } catch (err) {
        res.status(500).json({ message: "Error updating user" });
    }
};

// Deactivate user (soft delete)
export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndUpdate(
            id,
            { status: "inactive" },
            { new: true }
        );
        res.json({ message: "User deactivated ", user });
    } catch (err) {
        res.status(500).json({ message: "Error deleting user" });
    }
};

// Get own profile
export const getMyProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password");
        return res.json(user);
    } catch (err) {
        res.status(500).json({ message: "Error fetching profile" });
    }
};

// Update own profile
export const updateMyProfile = async (req, res) => {
    try {
        const { name, password } = req.body;
        const user = await User.findById(req.user._id).select("+password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        // Update fields
        if (name) user.name = name;
        if (password) user.password = password; // Will be hashed pre-save
        await user.save();
        res.json({
            message: "Profile updated",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    } catch (err) {
        res.status(500).json({ message: "Error updating profile" });
    }
};
