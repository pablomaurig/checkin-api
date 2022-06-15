import { Room } from '@entities/room.entity';
import { Guest } from '@entities/guest.entity';
// import { Room as RoomInterface } from '../types/room.types';

export const mapRoomDtoOrion = (room: Room) => {
  return {
    id: room.id.toString(),
    type: 'room',
    floor: {
      type: 'Integer',
      value: room.floor,
    },
    name: {
      type: 'String',
      value: room.name,
    },
    description: {
      type: 'String',
      value: room.description,
    },
    singleBeds: {
      type: 'Integer',
      value: room.singleBeds,
    },
    doubleBeds: {
      type: 'Integer',
      value: room.doubleBeds,
    },
    enable: {
      type: 'Boolean',
      value: room.enable,
    },
  };
};

export const mapPropertiesRoomDtoOrion = (room: Room) => {
  return {
    floor: {
      type: 'Integer',
      value: room.floor,
    },
    name: {
      type: 'String',
      value: room.name,
    },
    description: {
      type: 'String',
      value: room.description,
    },
    singleBeds: {
      type: 'Integer',
      value: room.singleBeds,
    },
    doubleBeds: {
      type: 'Integer',
      value: room.doubleBeds,
    },
    enable: {
      type: 'Boolean',
      value: room.enable,
    },
  };
};

export const mapGuestDtoOrion = (guest: Guest) => {
  return {
    id: guest.id.toString(),
    type: 'guest',
    firstName: {
      type: 'String',
      value: guest.firstName,
    },
    lastName: {
      type: 'String',
      value: guest.lastName,
    },
    gender: {
      type: 'String',
      value: guest.gender,
    },
    dateOfBirth: {
      type: 'Date',
      value: guest.dateOfBirth,
    },
    telephoneNumber: {
      type: 'String',
      value: guest.telephoneNumber,
    },
    country: {
      type: 'String',
      value: guest.country,
    },
    idCardFront: {
      type: 'String',
      value: guest.idCardFront,
    },
    idCardBack: {
      type: 'String',
      value: guest.idCardBack,
    },
    bookingId: {
      type: 'number',
      value: guest.bookingId,
    },
  };
};
