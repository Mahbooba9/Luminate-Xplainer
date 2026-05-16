require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const topicRoutes = require('./routes/topicRoutes');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/topics', topicRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});

// Global error handler to catch silent errors (like Multer errors)
app.use((err, req, res, next) => {
  console.error("=== GLOBAL ERROR HANDLER CAUGHT AN ERROR ===");
  console.error(err.stack || err);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
