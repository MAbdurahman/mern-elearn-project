/************************* imports *************************/
import colors from 'colors';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import {clerkMiddleware} from '@clerk/express';

/************************* setup config file *************************/
if (process.env.NODE_ENV !== 'production') {
   dotenv.config({path: './configs/config.env'});
}

/***************************** variables *****************************/
const app = express();
colors.enabled = true;

/**************************** middlewares ****************************/
if (process.env.NODE_ENV === 'development') {
   app.use(morgan('dev'));
}
app.use(helmet());
app.use(
   cors({
      origin: process.env.FRONTEND_URL,
      methods: ["GET", "POST", "DELETE", "PUT"],
      allowedHeaders: [
         "Content-Type",
         "Authorization",
         "Cache-Control",
         "Expires",
         "Pragma",
      ],
      credentials: true,
   })
);
app.use(clerkMiddleware());
app.use(express.json()); // for parsing application/json
app.use(express.raw({ type: 'application/json' }));
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

/*************************** import all routes ***************************/
import homeRoute from '../routes/homePageRoute.js';
import clerkRoute from '../routes/clerkRoute.js';
import educatorRoutes from '../routes/educatorRoutes.js';


/********************************* routes *********************************/
app.use('/', homeRoute);
app.use('/clerk', clerkRoute);
app.use('/api/educator', educatorRoutes);


export default app;