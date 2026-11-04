import { Router } from 'express';
import { 
  getRentals, 
  getRentalById, 
  createRentalRequest, 
  updateRentalStatus 
} from '../controllers/rentals.controller.js';

const router = Router();

router.get('/', getRentals);
router.get('/:id', getRentalById);
router.post('/', createRentalRequest);
router.patch('/:id/status', updateRentalStatus);

export default router;

