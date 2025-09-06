import express from 'express';
import {clerkWebhooks} from '../controllers/webhooksController.js';

const router = express.Router();

/************************* routes *************************/
router.post('/', clerkWebhooks);


export default router;