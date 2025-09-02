import axios from "axios";
import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {useAuth, useUser} from '@clerk/clerk-react';
import humanizeDuration from 'humanize-duration';
import {dummyCourses} from '../assets/assets.js';


export const AppContext = createContext();

export const AppContextProvider = (props) => {
   const backendURL = import.meta.env.VITE_BACKEND_URL;
   const currency = import.meta.env.VITE_CURRENCY;

   const navigate = useNavigate();
   const { getToken } = useAuth();
   const { user } = useUser();

   const [showLogin, setShowLogin] = useState(false);
   const [isEducator,setIsEducator] = useState(true);
   const [allCourses, setAllCourses] = useState([]);
   const [userData, setUserData] = useState(null);
   const [enrolledCourses, setEnrolledCourses] = useState([]);



   const fetchAllCourses = async () => {
      setAllCourses(dummyCourses);

/*      try {

         const { data } = await axios.get(backendURL + '/api/course/all');

         if (data.success) {
            setAllCourses(data.courses)
         } else {
            toast.error(data.message)
         }

      } catch (error) {
         toast.error(error.message)
      }*/
   }

   /**
    * calculateCourseRating - calculates the average rating of the course
    * @param course - the specified course
    * @returns {number} - returns the average rating of course
    */
   const calculateCourseRating = (course) => {

      if (course.courseRatings.length === 0) {
         return 0
      }

      let totalRating = 0
      course.courseRatings.forEach(rating => {
         totalRating += rating.rating
      })
      return Math.floor(totalRating / course.courseRatings.length)
   }

   useEffect(() => {
      fetchAllCourses().then(r => {});
   }, [])

   const value = {
      showLogin, setShowLogin,
      backendURL, currency, navigate,
      userData, setUserData, getToken,
      allCourses, fetchAllCourses,
      enrolledCourses, isEducator,
      setIsEducator, calculateCourseRating
   }
   return (
      <AppContext.Provider value={value}>
         {props.children}
      </AppContext.Provider>
   )
}