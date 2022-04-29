import express from 'express';
import {
  createRoomSchema,
  updateRoomSchema
} from '@schemas/room.schema';
import validatorHandler from '@middlewares/validator.handler';
import {
  createRoom,
  updateRoom
} from '@controllers/room.controller';


const router = express.Router();

router.post('/', validatorHandler(createRoomSchema, 'body'), createRoom);
router.patch('/:id', validatorHandler(updateRoomSchema, 'body'), updateRoom);

export default router;
