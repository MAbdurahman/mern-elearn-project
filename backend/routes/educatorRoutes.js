import express from 'express';
import {
   addNewCourse, getEducatorCourses, getEducatorDashboardData,
   getEnrolledStudentsData,
   updateRoleToEducator
} from '../controllers/educatorController.js';
import upload from '../configs/multerConfig.js';
import {authenticateEducator} from '../middlewares/authMiddleware.js';


const router = express.Router();

/************************* routes *************************/
router.get('/update-role', updateRoleToEducator);
router.post('/add-course', upload.single('image'), authenticateEducator, addNewCourse);
router.get('/courses', authenticateEducator, getEducatorCourses);
router.get('/dashboard', authenticateEducator, getEducatorDashboardData);
router.get('/enrolled-students', authenticateEducator, getEnrolledStudentsData);

export default router;