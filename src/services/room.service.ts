import { Booking } from '@entities/booking.entity';
import boom from '@hapi/boom';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { Room } from '../entities/room.entity';
import { CreateRoom, Room as RoomInterface } from '../types/room.types';

class RoomService {
  async createRoom(body: CreateRoom) {
    const { floor, name, description, singleBeds, doubleBeds } = body;

    const room = new Room();
    room.floor = floor;
    room.name = name;
    room.description = description;
    room.singleBeds = singleBeds;
    room.doubleBeds = doubleBeds;
    room.enable = true;
    await room.save();

    return room.id;
  }

  async updateRoom(id: number, body: Partial<RoomInterface>) {
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

    return rooms.filter(room => {
      return room.enable;
    });
  }

  async deleteRoom(id: number) {
    const room = await Room.findOneBy({ id: id });

    if (!room) {
      throw boom.notFound('Room does not exists');
    }

    const body = {
      enable: false,
    };

    await Room.update({ id: id }, body as QueryDeepPartialEntity<Room>);

    const updatedRoom = await Room.findOneBy({ id: id });

    return updatedRoom;
  }

  async getAssignableRoomsInDates(startDate: Date, endDate: Date) {
    console.log('Entro');
    const bookings = await Booking.createQueryBuilder('booking')
      .where(
        '((booking.startDate >= :startDate AND booking.startDate <= :endDate) OR (booking.endDate >= :startDate AND booking.endDate <= :endDate) OR (booking.startDate <= :startDate AND booking.endDate >= :endDate))',
        { startDate, endDate }
      )
      .andWhere('booking.roomId is not NULL')
      .getMany();

    const rooms = await this.getRooms();

    const assignableRooms = rooms.filter(room => {
      return !bookings
        .map(booking => {
          return booking.roomId;
        })
        .includes(room.id);
    });

    return assignableRooms;
  }
}

export default RoomService;
