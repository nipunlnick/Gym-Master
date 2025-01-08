import { Router } from 'express';
import { getClients, createClient, getClientById, updateClient, deleteClient, searchClients } from '../controllers/clientController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';
const router = Router();

router.post('/clients', verifyToken, createClient);  // Create member
router.get('/clients', getClients);  // Get all members

router.get('/clients/:id', getClientById);  // Get package by ID
router.put('/clients/:id', verifyToken, updateClient);  // Update member
router.delete('/clients/:id', verifyToken, deleteClient);  // Delete member

router.get('/clients/search', verifyToken, searchClients);

export default router;