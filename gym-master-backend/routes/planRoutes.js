import { Router } from 'express';
import { getPlans, createPlan } from '../controllers/planController';
import { verifyToken } from '../middleware/authMiddleware';
const router = Router();

router.get('/', getPlans);
router.post('/', verifyToken, createPlan);

export default router;
