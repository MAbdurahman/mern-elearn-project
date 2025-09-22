import User from '../models/userModel.js';
import Course from '../models/courseModel.js';
import CourseProgress from '../models/courseProgressModel.js';
import Purchase from '../models/purchaseModel.js';
import asyncHandler from '../utils/asyncHandlerUtils.js';
import stripe from 'stripe';
import {api_key_placeholder} from '../configs/configPlaceholder.js';

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

/**
 * purchaseUserCourse -
 * @type {(function(*, *, *): void)|*}
 */
export const purchaseUserCourse = asyncHandler(async (req, res) => {
   try {
      const {courseId} = req.body;
      const {origin} = req.headers;
      const userId = req.auth.userId;

      const userData = await User.findById(userId);
      const courseData = await Course.findById(courseId);

      if (!userData) {
         return res.json({success: false, message: 'User Data Not Found!'});
      }
      if (!courseData) {
         return res.json({success: false, message: 'Course Data Not Found!'});
      }

      const purchaseData = {
         courseId: courseData._id,
         userId,
         amount: (courseData.coursePrice - courseData.discount * courseData.coursePrice / 100).toFixed(2),
      }

      const newPurchase = await Purchase.create(purchaseData);

      // Stripe Gateway Initialize
      const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY || api_key_placeholder);
      const currency = process.env.CURRENCY.toLocaleLowerCase();

      // Creating line items to for Stripe
      const line_items = [{
         price_data: {
            currency,
            product_data: {
               name: courseData.courseTitle
            },
            unit_amount: Math.floor(newPurchase.amount) * 100
         },
         quantity: 1
      }];

      const session = await stripeInstance.checkout.sessions.create({
         success_url: `${origin}/loading/enrollments`,
         cancel_url: `${origin}/`,
         line_items: line_items,
         mode: 'payment',
         metadata: {
            purchaseId: newPurchase._id.toString()
         }
      });

      res.json({success: true, message: 'Course purchase successfully made!', session_url: session.url });


   } catch(err) {
      res.json({ success: false, message: err.message });
   }
});

/**
 * retrieveUserEnrolledCourses -
 * @type {(function(*, *, *): void)|*}
 */
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

/**
 * updateUserCourseProgress -
 * @type {(function(*, *, *): void)|*}
 */
export const updateUserCourseProgress = asyncHandler(async (req, res) => {
   try {

      const userId = req.auth.userId;
      const {courseId, lectureId} = req.body;

      const progressData = await CourseProgress.findOne({ userId, courseId });

      if (progressData) {
         if (progressData.lectureCompleted.includes(lectureId)) {
            return res.json({success: true, message: 'Lecture has been already completed!!'});
         }

         progressData.lectureCompleted.push(lectureId);
         await progressData.save();

      } else {
         await CourseProgress.create({
            userId,
            courseId,
            lectureCompleted: [lectureId]
         });

      }

      res.json({success: true, message: 'Successfully updated Course Progress!'});

   } catch (err) {
      res.json({success: false, message: err.message});
   }
});

/**
 * retrieveUserCourseProgess -
 * @type {(function(*, *, *): void)|*}
 */
export const retrieveUserCourseProgress = asyncHandler(async (req, res) => {
   try {
      const userId = req.auth.userId;
      const {courseId} = req.body;

      const progressData = await CourseProgress.findOne({userId, courseId});

      res.json({success: true, message: 'Successfully retrieved User Course Progess!', progressData});

   } catch (err) {
      res.json({success: false, message: err.message});
   }
});

/**
 * addUserCourseRating -
 * @type {(function(*, *, *): void)|*}
 */
export const addUserCourseRating = asyncHandler(async (req, res) => {

   const userId = req.auth.userId;
   const {courseId, rating} = req.body;


   if (!courseId || !userId || !rating || rating < 1 || rating > 5) {
      return res.json({success: false, message: 'InValid Details'});
   }

   try {
      const course = await Course.findById(courseId);
      if (!course) {
         return res.json({success: false, message: 'Course not found!'});
      }

      const user = await User.findById(userId);
      if (!user || !user.enrolledCourses.includes(courseId)) {
         return res.json({success: false, message: 'User has not purchased this course!'});
      }

      // Check whether user has already rated course
      const existingRatingIndex = course.courseRatings.findIndex(r => r.userId === userId);

      if (existingRatingIndex > -1) {
         // Update the existing rating
         course.courseRatings[existingRatingIndex].rating = rating;

      } else {
         // Add a new rating
         course.courseRatings.push({ userId, rating });

      }

      await course.save();

      return res.json({success: true, message: 'User rating successfully added!'});

   } catch (err) {
      return res.json({success: false, message: err.message});

   }
});