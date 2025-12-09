import User from '../models/User.js'; 
import jwt from 'jsonwebtoken';
// --- GET ALL USERS ---
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find()
            .select('-password')
            .sort({ createdAt: -1 }); // Newest users first

        res.status(200).json(users);
    } catch (err) {
        console.error("Error in getAllUsers (Admin):", err.message);
        res.status(500).json({ 
            message: "Failed to retrieve user data.",
            error: err.message 
        });
    }
};

// --- DELETE A USER ---
export const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;

        // Ensure the admin isn't trying to delete themselves (optional but recommended)
        if (req.user?.id === userId) { 
         return res.status(403).json({ message: "Administrators cannot delete their own account via this panel." });
        }

        const deletedUser = await User.findByIdAndDelete(userId);
        
        if (!deletedUser) {
            return res.status(404).json({ message: "User not found." });
        }
        
        // In a full application, you'd add logic here to delete associated data (messages, streams, etc.)

        res.status(200).json({ 
            message: `User ${deletedUser.username} (${userId}) successfully removed.`,
            deletedUserId: userId 
        });

    } catch (err) {
        console.error("Error in deleteUser (Admin):", err.message);
        res.status(500).json({ 
            message: "Failed to delete user.",
            error: err.message
        });
    }
};
export const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user || !(await user.matchPassword(password))) { // Uses your model method
            return res.status(401).json({ message: "Invalid credentials." });
        }

        // 🛑 CRITICAL AUTHORIZATION CHECK
        if (user.role !== 'admin') {
            return res.status(403).json({ message: "Access Denied: You are not authorized to use the admin panel." });
        }

        const token = jwt.sign(
            // Include the role in the JWT payload!
            { id: user._id, role: user.role }, 
            process.env.JWT_SECRET_KEY,
            { expiresIn: "7d" }
        );

        res.status(200).json({ token, role: user.role, email: user.email });

    } catch (error) {
        console.error("Error in adminLogin:", error.message);
        res.status(500).json({ message: "Internal server error." });
    }
};