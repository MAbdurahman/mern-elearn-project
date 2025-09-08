import express from 'express';
import {
   addNewCourse,
   updateRoleToEducator
} from '../controllers/educatorController.js';
import upload from '../configs/multerConfig.js';
import {authenticateEducator} from '../middlewares/authMiddleware.js';


const router = express.Router();

/************************* routes *************************/
router.get('/update-role', updateRoleToEducator);
router.post('/add-course',upload.single('image'), authenticateEducator, addNewCourse);







export default router;