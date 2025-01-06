import { Router } from 'express';
import { getClients, createClient } from '../controllers/clientController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';
const router = Router();

router.get('/', getClients);  // Fetch all members
router.post('/', verifyToken, createClient);  // Protected route to add a new member

export default router;