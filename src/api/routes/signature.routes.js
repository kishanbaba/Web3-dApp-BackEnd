import { Router } from 'express';
import { verifySignatureController } from '../controllers/signature.controller.js';

const router = Router();

// This will be accessed via POST /api/v1/signature/verify
router.post('/verify', verifySignatureController);

export default router;