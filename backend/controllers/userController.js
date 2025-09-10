import User from '../models/userModel.js';
import Course from '../models/courseModel.js';
import CourseProgress from '../models/courseProgressModel.js';
import Purchase from '../models/purchaseModel.js';
import asyncHandler from '../utils/asyncHandlerUtils.js';

/**
 * retrieveUserData -
 * @type {(function(*, *, *): void)|*}
 */
export const retrieveUserData = asyncHandler(async (req, res) => {
   try {
      const userId = req.auth.userId
      const user = await User.findById(userId);

      if (!user) {
         return res.json({ success: false, message: 'User Not Found' });
      }

      res.json({ success: true, message: 'User successfully found!', user });

   } catch (err) {
      res.json({ success: false, message: err.message });
   }
});


export const purchaseUserCourse = asyncHandler(async (req, res) => {
   res.json({success: true, message: 'Purchase Course'});
});

export const retrieveUserEnrolledCourses = asyncHandler(async (req, res) => {
   try {
      const userId = req.auth.userId;
      const userData = await User.findById(userId)
         .populate('enrolledCourses');

      res.json({ success: true, enrolledCourses: userData.enrolledCourses });

   } catch (err) {
      res.json({ success: false, message: err.message });
   }
});

export const updateUserCourseProgress = asyncHandler(async (req, res) => {
   res.json({success: true, message: 'Update Course Progress'});
});

export const retrieveUserCourseProgress = asyncHandler(async (req, res) => {
   res.json({success: true, message: 'User Enrolled Course Progress'});
});

export const addUserCourseRating = asyncHandler(async (req, res) => {
   res.json({success: true, message: 'Add User Rating'});
});