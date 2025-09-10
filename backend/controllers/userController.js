import User from '../models/userModel.js';
import Course from '../models/courseModel.js';
import CourseProgress from '../models/courseProgressModel.js';
import Purchase from '../models/purchaseModel.js';
import asyncHandler from '../utils/asyncHandlerUtils.js';


export const retrieveUserData = asyncHandler(async (req, res) => {
   res.json({success: true, message: 'User Retrieved Successfully'});
});

export const purchaseUserCourse = asyncHandler(async (req, res) => {
   res.json({success: true, message: 'Purchase Course'});
});

export const retrieveUserEnrolledCourses = asyncHandler(async (req, res) => {
   res.json({success: true, message: 'User Enrolled Courses'});
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