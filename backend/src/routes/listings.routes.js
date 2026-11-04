import { Router } from 'express';
import { 
  getListings, 
  getListingById, 
  createListing, 
  updateListing, 
  deleteListing,
  getCategories
} from '../controllers/listings.controller.js';

const router = Router();

router.get('/categories', getCategories);
router.get('/', getListings);
router.get('/:id', getListingById);
router.post('/', createListing);
router.put('/:id', updateListing);
router.delete('/:id', deleteListing);

export default router;

