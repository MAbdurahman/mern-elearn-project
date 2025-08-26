import React, { useContext } from 'react';
import { Routes, Route, useLocation, useMatch } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from 'react-toastify';
import HomePage from '../pages/student/HomePage.jsx';
import PlayerPage from '../pages/student/PlayerPage.jsx';
import CourseListPage from '../pages/student/CourseListPage.jsx';
import CourseDetailsPage from '../pages/student/CourseDetailsPage.jsx';
import EnrollmentsPage from '../pages/student/EnrollmentsPage.jsx';
import LoadingComponent from '../components/student/LoadingComponent.jsx';
import EducatorPage from '../pages/educator/EducatorPage.jsx';
import DashboardPage from '../pages/educator/DashboardPage.jsx';
import AddCoursePage from '../pages/educator/AddCoursePage.jsx';
import CoursesPage from '../pages/educator/CoursesPage.jsx';
import StudentsEnrolledPage from '../pages/educator/StudentsEnrolledPage.jsx';



export default function App() {

   return (
      <div>
         <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/course/:courseId" element={<CourseDetailsPage />} />
            <Route path="/course-list" element={<CourseListPage />} />
            <Route path="/course-list/:input" element={<CourseListPage />} />
            <Route path="/enrollments" element={<EnrollmentsPage />} />
            <Route path="/player/:courseId" element={<PlayerPage />} />
            <Route path="/loading/:path" element={<LoadingComponent />} />
            <Route path="/educator" element={<EducatorPage />} >
               <Route path="educator" element={<DashboardPage />} />
               <Route path="add-course" element={<AddCoursePage />} />
               <Route path="courses" element={<CoursesPage />} />
               <Route path="students-enrolled" element={<StudentsEnrolledPage />} />
            </Route>
         </Routes>
      </div>

   );
}