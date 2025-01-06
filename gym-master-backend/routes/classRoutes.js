import { Router } from 'express';
import { getClasses, createClass } from '../controllers/classController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';
const router = Router();

router.get('/', getClasses);
router.post('/', verifyToken, createClass);

export default router;
