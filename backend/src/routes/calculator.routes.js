import { Router } from 'express';
import { calculateEarnings } from '../controllers/calculator.controller.js';

const router = Router();

router.post('/estimate', calculateEarnings);

export default router;

