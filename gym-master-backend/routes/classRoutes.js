import { Router } from 'express';
import { getClasses, createClass } from '../controllers/classController';
import { verifyToken } from '../middleware/authMiddleware';
const router = Router();

router.get('/', getClasses);
router.post('/', verifyToken, createClass);

export default router;
