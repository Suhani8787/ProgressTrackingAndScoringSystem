const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// Register a new candidate
router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "User already exists." });

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("Hashed Password:", hashedPassword);

        const newUser = new User({ name, email, password: hashedPassword });

        await newUser.save();
        console.log("New user saved:", newUser);
        res.status(201).json({ message: "User registered successfully." });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
});

// Login candidate
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials (No user found).' });
        }

        console.log("User found:", user);

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        console.log("Password match result:", isPasswordMatch);

        if (!isPasswordMatch) {
            return res.status(400).json({ message: 'Invalid credentials (Password mismatch).' });
        }

        const token = jwt.sign({ userId: user._id, name: user.name }, process.env.JWT_SECRET, { expiresIn: '1h' });
        console.log("Generated Token:", token);

        res.json({ token, name: user.name });
    } catch (err) {
        console.error("Error during login:", err);
        res.status(500).json({ message: 'Server error', error: err });
    }
});

// Get users list (Admin purpose)
router.get('/users', async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);  // Return the list of users
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
});

module.exports = router;