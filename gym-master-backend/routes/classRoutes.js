import { Router } from 'express';
import { getClasses, createClass, updateClass, deleteClass, getClassById, searchClasses } from '../controllers/classController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';
const router = Router();

router.post('/classes', verifyToken, createClass);  // Create class
router.get('/classes', getClasses);  // Get all classs

router.put('/classes/:id', verifyToken, updateClass);  // Update class
router.delete('/classes/:id', verifyToken, deleteClass);  // Delete class
router.get('/classes/:id', verifyToken, getClassById);  // Get class by ID

router.get('/classes/search', verifyToken, searchClasses);

export default router;
