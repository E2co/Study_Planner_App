require('dotenv').config();
const express = require('express');
const app = express();
const connectDB = require('./src/config/db');

// Route files
const examRoutes = require('./src/routes/examRoutes');
const scheduleRoutes = require('./src/routes/scheduleRoutes');

// Initialize DB
connectDB();

// Middleware
const cors = require('cors');
const corsOptions = {
    origin: 'http://localhost:5173', // Vite default port
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(express.json()); // Parsing JSON bodies

// Routes
app.use('/api/exams', examRoutes);
app.use('/api/schedule', scheduleRoutes);

// Base Route
app.get('/', (req, res) => {
    res.send('Smart Study Planner API is running...');
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});