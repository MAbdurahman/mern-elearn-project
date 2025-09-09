import User from '../models/userModel.js';
import Course from '../models/courseModel.js';
import Purchase from '../models/purchaseModel.js';
import asyncHandler from '../utils/asyncHandlerUtils.js';
import {clerkClient} from '@clerk/express';
import {v2 as cloudinary} from 'cloudinary';

/**
 * updateRoleToEducator - updates user's role to educator
 * @type {(function(*, *, *): void)|*}
 */
export const updateRoleToEducator = asyncHandler(async (req, res) => {
   try {
      const userId = req.auth.userId;

      await clerkClient.users.updateUserMetadata(userId, {
         publicMetadata: {
            role: 'educator',
         },
      });

      res.json({ success: true, message: 'User role has been updated successfully!' });

   } catch (err) {
      res.json({success: false, message: err.message});
   }
});

/**
 * addNewCourse - add and creates a new course
 * @type {(function(*, *, *): void)|*}
 */
export const addNewCourse = asyncHandler(async (req, res) => {
   try {
      const {courseData} = req.body;
      const imageFile = req.file;
      const educatorId = req.auth.userId;

      if (!imageFile) {
         return res.json({ success: false, message: 'CourseThumbnail - error uploading image file!' });
      }

      const parsedCourseData = await JSON.parse(courseData);
      parsedCourseData.educator = educatorId;

      const newCourse = await Course.create(parsedCourseData);

      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
         folder: 'mern-elearn/courses'
      });

      newCourse.courseThumbnail = {
         public_id: imageUpload.public_id,
         url: imageUpload.secure_url
      }

      await newCourse.save();

      res.json({ success: true, message: 'New course successfully added!'});

   } catch(err) {
      res.json({ success: false, message: err.message });
   }
});

/**
 * getEducatorCourses = retrieves educator's courses
 * @type {(function(*, *, *): void)|*}
 */
export const getEducatorCourses = asyncHandler(async (req, res) => {
   try {

      const educatorId = req.auth.userId

      const courses = await Course.find({educatorId});

      res.json({ success: true, courses });

   } catch (err) {
      res.json({ success: false, message: err.message });
   }
});

/**
 * getEducatorDashboardData -
 * @type {(function(*, *, *): void)|*}
 */
export const getEducatorDashboardData = asyncHandler(async (req, res) => {

   try {
      const educatorId = req.auth.userId;

      const courses = await Course.find({educatorId});

      const totalCourses = courses.length;

      const courseIds = courses.map(course => course._id);

      // Calculate total earnings from purchases
      const purchases = await Purchase.find({
         courseId: { $in: courseIds },
         status: 'completed'
      });

      const totalEarnings = purchases.reduce((sum, purchase) => sum + purchase.amount, 0);

      // Collect unique enrolled student IDs with their course titles
      const enrolledStudentsData = [];
      for (const course of courses) {
         const students = await User.find({
            _id: { $in: course.enrolledStudents }
         }, 'name imageURL');

         students.forEach(student => {
            enrolledStudentsData.push({
               courseTitle: course.courseTitle,
               student
            });
         });
      }

      res.json({
         success: true,
         dashboardData: {
            totalEarnings,
            enrolledStudentsData,
            totalCourses
         }
      });
   } catch (err) {
      res.json({ success: false, message: err.message });
   }

});

export const getEnrolledStudentsData = asyncHandler(async (req, res) => {
   try {
      const educatorId = req.auth.userId;

      // Fetch all courses created by the educator
      const courses = await Course.find({educatorId});

      // Get the list of course IDs
      const courseIds = courses.map(course => course._id);

      // Fetch purchases with user and course data
      const purchases = await Purchase.find({
         courseId: { $in: courseIds },
         status: 'completed'
      }).populate('userId', 'name imageURL').populate('courseId', 'courseTitle');

      // enrolled students data
      const enrolledStudents = purchases.map(purchase => ({
         student: purchase.userId,
         courseTitle: purchase.courseId.courseTitle,
         purchaseDate: purchase.createdAt
      }));

      res.json({
         success: true,
         enrolledStudents
      });

   } catch (err) {
      res.json({success: false, message: err.message});
   }

});