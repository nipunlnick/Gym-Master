import { Router } from 'express';
import { getMembers, createMember } from '../controllers/memberController';
import { verifyToken } from '../middleware/authMiddleware';
const router = Router();

router.get('/', getMembers);  // Fetch all members
router.post('/', verifyToken, createMember);  // Protected route to add a new member

export default router;
