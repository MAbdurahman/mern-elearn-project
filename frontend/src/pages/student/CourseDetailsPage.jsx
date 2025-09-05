import React, {useContext, useEffect, useState} from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';
import{toast} from 'react-toastify';
import humanizeDuration from 'humanize-duration';
import YouTube from 'react-youtube';
import {useAuth} from '@clerk/clerk-react';
import {AppContext} from '../../context/AppContext.jsx';
import FooterComponent from '../../components/student/FooterComponent.jsx';
import LoadingComponent from '../../components/student/LoadingComponent.jsx';
import {assets} from '../../assets/assets.js';


export default function CourseDetailsPage() {

   return (
      <div className="text-4xl">
         <h2>CourseDetailsPage</h2>
      </div>

   );
}