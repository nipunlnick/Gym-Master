import { Router } from 'express';
import { getPlans, createPlan } from '../controllers/planController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';
const router = Router();

router.get('/', getPlans);
router.post('/', verifyToken, createPlan);

export default router;
