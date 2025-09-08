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


export const addNewCourse = asyncHandler(async (req, res) => {
   try {
      const { courseData } = req.body;
      const imageFile = req.file;
      const educatorId = req.auth.userId;

      if (!imageFile) {
         return res.json({ success: false, message: 'CourseThumbnail - error uploading image file!' });
      }

      const parsedCourseData = await JSON.parse(courseData)

      parsedCourseData.educator = educatorId;

      const newCourse = await Course.create(parsedCourseData);

      const imageUpload = await cloudinary.uploader.upload(imageFile.path)

      /*newCourse.courseThumbnail.url = imageUpload.secure_url;
      newCourse.courseThumbnail.public_id = imageUpload.public_id;*/
      
      newCourse.courseThumbnail = {
         public_id: imageUpload.public_id,
         url: imageUpload.secure_url
      }

      await newCourse.save()

      res.json({ success: true, message: 'New course successfully added!' });

   } catch(err) {
      res.json({ success: false, message: err.message });
   }
});