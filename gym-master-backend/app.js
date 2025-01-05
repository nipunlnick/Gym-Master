import express, { json } from 'express';
import cors from 'cors';
import { config } from 'dotenv';

config();

import authRoutes from './routes/authRoutes';
import classRoutes from './routes/classRoutes';
import planRoutes from './routes/planRoutes';
import trainerRoutes from './routes/trainerRoutes';
import memberRoutes from './routes/memberRoutes';

const app = express();
app.use(cors());
app.use(json());  // Parse incoming JSON requests

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/classes', classRoutes);
app.use('/api/plans', planRoutes);
app.use('/api/trainers', trainerRoutes);
app.use('/api/members', memberRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
