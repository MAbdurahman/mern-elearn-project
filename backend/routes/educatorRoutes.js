import express from 'express';
import {updateRoleToEducator} from '../controllers/educatorController.js';


const router = express.Router();

/************************* routes *************************/
router.get('/update-role', updateRoleToEducator);







export default router;