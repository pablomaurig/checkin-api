import express, { Application } from 'express';
import bookingRouter from '@routes/booking.router';
import userRouter from '@routes/user.router';
import authRouter from '@routes/auth.router';

const routerApi = (app: Application) => {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/bookings', bookingRouter);
  router.use('/users', userRouter);
  router.use('/auth', authRouter);
};

export default routerApi;
