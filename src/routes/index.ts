import express from 'express';
import bookingRouter from '@routes/booking.router';
import userRouter from '@routes/user.router';
import authRouter from '@routes/auth.router';
import passport from 'passport';
import { checkRoles } from '@middlewares/auth.handler';
import { UserRole } from '../types/user.types';

const routerApi = (app: any) => {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/bookings', bookingRouter);
  router.use(
    '/users',
    passport.authenticate('jwt', { session: false }),
    checkRoles(UserRole.ADMIN, UserRole.CUSTOMER),
    userRouter
  );
  router.use('/auth', authRouter);
};

export default routerApi;
