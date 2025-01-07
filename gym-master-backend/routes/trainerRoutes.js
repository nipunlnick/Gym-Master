import { Router } from 'express';
import { getTrainers, createTrainer, updateTrainer, getTrainerById, deleteTrainer, searchTrainers } from '../controllers/trainerController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';
const router = Router();

router.post('/trainers', verifyToken, createTrainer);  // Create member
router.get('/trainers', getTrainers);  // Get all members

router.get('/trainers/:id', verifyToken, getTrainerById);  // Get package by ID
router.put('/trainers/:id', verifyToken, updateTrainer);  // Update member
router.delete('/trainers/:id', verifyToken, deleteTrainer);  // Delete member

router.get('/trainers/search', verifyToken, searchTrainers);

export default router;
