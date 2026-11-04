import { Router } from 'express';
import { 
  getCurrentUser, 
  loginUser, 
  registerUser, 
  updateProfile 
} from '../controllers/users.controller.js';

const router = Router();

router.get('/me', getCurrentUser);
router.post('/login', loginUser);
router.post('/register', registerUser);
router.patch('/profile', updateProfile);

export default router;

