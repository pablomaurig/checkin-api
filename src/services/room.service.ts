//import boom from '@hapi/boom';
//import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { Room } from '../entities/room.entity';
import {
  CreateRoom
} from '../types/room.types';

class RoomService {
    async createRoom(body: CreateRoom) {
        const {   
            floor, 
            name, 
            description, 
            singleBeds, 
            doubleBeds 
        } = body;
    
        const room = new Room();
        room.floor = floor;
        room.name = name;
        room.description = description;
        room.singleBeds = singleBeds;
        room.doubleBeds = doubleBeds;
        await room.save();
    
        return room.id;
      }
}      

export default RoomService;