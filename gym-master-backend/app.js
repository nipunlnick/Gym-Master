import express, { json } from 'express';
import cors from 'cors';
const app = express();
app.use(cors());
app.use(json());

// Sample routes
app.get('/', (req, res) => res.send('API is running...'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);
