import { Router } from 'express';
import { getTrainers, createTrainer } from '../controllers/trainerController';
import { verifyToken } from '../middleware/authMiddleware';
const router = Router();

router.get('/', getTrainers);  // Fetch all trainers
router.post('/', verifyToken, createTrainer);  // Protected route to add a new trainer

export default router;
