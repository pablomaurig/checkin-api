import express, { Application } from 'express';
import bookingRouter from '@routes/booking.router';
import userRouter from '@routes/user.router';
import authRouter from '@routes/auth.router';
import roomRouter from '@routes/room.router';
import employeeRouter from '@routes/employee.router';
import surveyRouter from './survey.router';

const routerApi = (app: Application) => {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/bookings', bookingRouter);
  router.use('/users', userRouter);
  router.use('/auth', authRouter);
  router.use('/rooms', roomRouter);
  router.use('/employees', employeeRouter);
  router.use('/surveys', surveyRouter);
};

export default routerApi;
