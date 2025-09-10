/************************** imports **************************/
import express from 'express';
import {stripeWebhooks} from '../controllers/webhooksController.js';

/************************* variables *************************/
const router = express.Router();

/************************** routes **************************/
router.post('/', stripeWebhooks);

export default router;