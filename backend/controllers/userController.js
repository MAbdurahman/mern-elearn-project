import User from '../models/userModel.js';
import Course from '../models/courseModel.js';
import CourseProgress from '../models/courseProgressModel.js';
import Purchase from '../models/purchaseModel.js';
import asyncHandler from '../utils/asyncHandlerUtils.js';
import stripe from 'stripe';

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
      const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);
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

export const updateUserCourseProgress = asyncHandler(async (req, res) => {
   res.json({success: true, message: 'Update Course Progress'});
});

export const retrieveUserCourseProgress = asyncHandler(async (req, res) => {
   res.json({success: true, message: 'User Enrolled Course Progress'});
});

export const addUserCourseRating = asyncHandler(async (req, res) => {
   res.json({success: true, message: 'Add User Rating'});
});