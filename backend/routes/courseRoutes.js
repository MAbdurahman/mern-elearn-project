/************************** imports **************************/
import express from 'express';
import {getAllCourses, getSingleCourse} from '../controllers/courseController.js';

/************************* variable *************************/
const router = express.Router();

/************************** routes **************************/
router.get('/all-courses', getAllCourses);
router.get('/:courseId', getSingleCourse);

export default router;