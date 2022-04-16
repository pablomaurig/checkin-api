import express from 'express';
import bookingRouter from './booking.router';
import userRouter from './user.router';

const routerApi = (app: any) => {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/bookings', bookingRouter);
  router.use('/users', userRouter);
};

export default routerApi;
