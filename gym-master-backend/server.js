// Importing dependencies
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { config } from 'dotenv';

// Initialize dotenv to use environment variables
config();

// Import route handlers
import authRoutes from './routes/authRoutes.js';
import classRoutes from './routes/classRoutes.js';
import clientRoutes from './routes/clientRoutes.js';
import packageRoutes from './routes/packageRoutes.js';
import planRoutes from './routes/planRoutes.js';
import statsRoutes from './routes/statsRoutes.js';
import trainerRoutes from './routes/trainerRoutes.js';

// Create an instance of Express
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/auth', authRoutes);         // Authentication routes
app.use('/classes', classRoutes);  // Class management routes
app.use('/clients', clientRoutes);    // Client management routes
app.use('/packages', packageRoutes);  // Package creation and management
app.use('/plans', planRoutes);      // Plan management routes
app.use('/stats', statsRoutes);       // Stats routes (dashboard)
app.use('/trainers', trainerRoutes);  // Trainer management

// Base route to ensure server is running
app.get('/', (req, res) => {
    res.send('Server is running...');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
