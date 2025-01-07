import { Router } from 'express';
import { createPackage, getPackages, updatePackage, deletePackage, getPackageById } from '../controllers/packageController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';
const router = Router();

router.post('/packages', verifyToken, createPackage);  // Create package
router.get('/packages', getPackages);  // Get all packages

router.put('/packages/:id', verifyToken, updatePackage);  // Update package
router.delete('/packages/:id', verifyToken, deletePackage);  // Delete package
router.get('/packages/:id', verifyToken, getPackageById);  // Get package by ID

export default router;