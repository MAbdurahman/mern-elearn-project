import Course from '../models/courseModel.js';
import asyncHandler from '../utils/asyncHandlerUtils.js';

/**
 * getAllCourses -
 * @type {(function(*, *, *): void)|*}
 */
export const getAllCourses = asyncHandler(async (req, res) => {
   try {

      const courses = await Course.find({ isPublished: true })
         .select(['-courseContent', '-enrolledStudents'])
         .populate({ path: 'educator', select: '-password' })

      res.json({ success: true, courses })

   } catch (err) {
      res.json({ success: false, message: err.message })
   }

});

/**
 * getSingleCourse -
 * @type {(function(*, *, *): void)|*}
 */
export const getSingleCourse = asyncHandler(async (req, res) => {
   const {courseId} = req.params;

   try {

      const courseData = await Course.findById(courseId)
         .populate({ path: 'educator'});

      // Remove lectureUrl if isPreviewFree is false
      courseData.courseContent.forEach(chapter => {
         chapter.chapterContent.forEach(lecture => {
            if (!lecture.isPreviewFree) {
               lecture.lectureUrl = '';
            }
         });
      });

      res.json({ success: true, courseData });

   } catch (err) {
      res.json({ success: false, message: err.message });
   }
});