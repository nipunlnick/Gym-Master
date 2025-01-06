import { Router } from 'express';
import { getTrainers, createTrainer } from '../controllers/trainerController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';
const router = Router();

router.get('/', getTrainers);  // Fetch all trainers
router.post('/', verifyToken, createTrainer);  // Protected route to add a new trainer

export default router;
