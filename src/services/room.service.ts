import boom from '@hapi/boom';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { Room } from '../entities/room.entity';
import {
  CreateRoom, 
  Room as RoomInterface
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
    
    async updateRoom(id: number, body: Partial<RoomInterface>){
      const room = await Room.findOneBy({ id: id });
      if (!room) {
        throw boom.notFound('Room does not exists');
      }

      await Room.update({ id: id }, body as QueryDeepPartialEntity<Room>);

      const updatedRoom = await Room.findOneBy({ id: id });

      return updatedRoom;
    }  

    async getRooms() {
      const rooms = await Room.find();

      //if (rooms.length === 0) throw boom.notFound('User not found');
  
      return rooms;
    }

    async deleteRoom(id: number) {
      const room = await Room.findOneBy({ id: id });
  
      if (!room) {
        throw boom.notFound('Room does not exists');
      }
  
      await room.remove();
  
      return room;
    }
  
}      

export default RoomService;