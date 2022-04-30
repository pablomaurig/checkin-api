import express from 'express';
import {
  createRoomSchema,
  updateRoomSchema
} from '@schemas/room.schema';
import passport from 'passport';
import { checkRoles } from '@middlewares/auth.handler';
import { UserRole } from '../types/user.types';
import validatorHandler from '@middlewares/validator.handler';
import {
  createRoom,
  updateRoom
} from '@controllers/room.controller';


const router = express.Router();

router.post(
  '/', 
  passport.authenticate('jwt', { session: false }),
  checkRoles(UserRole.ADMIN, UserRole.EMPLOYEE),
  validatorHandler(createRoomSchema, 'body'),
  createRoom);

router.patch(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles(UserRole.ADMIN, UserRole.EMPLOYEE),
  validatorHandler(updateRoomSchema, 'body'),
  updateRoom);

export default router;
