/************************* imports *************************/
import express from 'express';
import {
   addUserCourseRating,
   purchaseUserCourse, retrieveUserCourseProgress,
   retrieveUserData,
   retrieveUserEnrolledCourses, updateUserCourseProgress
} from '../controllers/userController.js';

/************************* variable *************************/
const router = express.Router();

/************************** routes **************************/
router.get('/retrieve-data', retrieveUserData);
router.post('/purchase-course', purchaseUserCourse);
router.get('/enrolled-courses', retrieveUserEnrolledCourses);
router.post('/update-course-progress', updateUserCourseProgress);
router.get('/get-course-progress', retrieveUserCourseProgress);
router.post('/add-rating', addUserCourseRating);

export default router;