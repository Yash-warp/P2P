import { Router } from 'express';
import { 
  getConversations, 
  getConversationById, 
  sendMessage, 
  createConversation 
} from '../controllers/messages.controller.js';

const router = Router();

router.get('/', getConversations);
router.post('/', createConversation);
router.get('/:id', getConversationById);
router.post('/:id', sendMessage);

export default router;

