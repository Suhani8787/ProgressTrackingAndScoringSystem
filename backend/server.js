const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5005;
const projectRoutes = require('./routes/projectRoutes');
const authRoutes = require("./routes/authRoutes");


// Middleware
app.use(express.json());
app.use(cors());
app.use('/api/projects', projectRoutes);
app.use("/api/auth", authRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Routes placeholder
app.get('/', (req, res) => {
    res.send("API is running");
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});