import User from '../models/userModel.js';
import Course from '../models/courseModel.js';
import Purchase from '../models/purchaseModel.js';
import asyncHandler from '../utils/asyncHandlerUtils.js';
import {clerkClient} from '@clerk/express';
import {v2 as Cloudinary} from 'cloudinary';

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