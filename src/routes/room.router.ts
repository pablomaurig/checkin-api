import express from 'express';
import {
  createRoomSchema
} from '@schemas/room.schema';
import validatorHandler from '@middlewares/validator.handler';
import {
  createRoom
} from '@controllers/room.controller';


const router = express.Router();

router.post('/', validatorHandler(createRoomSchema, 'body'), createRoom);

export default router;
