const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');

// Route files
const examRoutes = require('./routes/examRoutes');
const scheduleRoutes = require('./routes/scheduleRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Middleware
const corsOptions = {
    origin: 'http://localhost:5173', // Vite default port
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(express.json()); // Parsing JSON bodies
app.use(express.urlencoded({ extended: false }));

// Initialize DB
connectDB();

// Routes
app.use('/api/exams', examRoutes);
app.use('/api/schedule', scheduleRoutes);
app.use('/api/users', authRoutes);

// Base Route
app.get('/', (req, res) => {
    res.send('Smart Study Planner API is running...');
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});