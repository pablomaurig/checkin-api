import { Room } from '@entities/room.entity';
//import { Room as RoomInterface } from '../types/room.types';

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
