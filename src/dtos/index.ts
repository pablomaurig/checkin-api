import { Room } from '@entities/room.entity';
import { Booking } from '@entities/booking.entity';
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

export const mapBookingDtoOrion = (booking: Booking) => {
  return {
    id: booking.id.toString(),
    type: 'booking',
    roomId: {
      type: 'Integer',
      value: booking.roomId,
    },
    bookingNumber: {
      type: 'String',
      value: booking.bookingNumber,
    },
    surname: {
      type: 'String',
      value: booking.surname,
    },
    startDate: {
      type: 'Date',
      value: booking.startDate,
    },
    endDate: {
      type: 'Date',
      value: booking.endDate,
    },
    amountGuests: {
      type: 'Integer',
      value: booking.amountGuests,
    },
    checkIn: {
      type: 'Date',
      value: booking.checkIn,
    },
    checkOut: {
      type: 'Date',
      value: booking.checkOut,
    },
    state: {
      type: 'String',
      value: booking.state,
    },
    enable: {
      type: 'Boolean',
      value: booking.enable,
    },
    createdAt: {
      type: 'Date',
      value: booking.createdAt,
    },
    updatedAt: {
      type: 'Date',
      value: booking.updatedAt,
    },
  };
};
export const mapPropertiesBookingDtoOrion = (booking: Booking) => {
  return {
    roomId: {
      type: 'Integer',
      value: booking.roomId,
    },
    bookingNumber: {
      type: 'String',
      value: booking.bookingNumber,
    },
    surname: {
      type: 'String',
      value: booking.surname,
    },
    startDate: {
      type: 'Date',
      value: booking.startDate,
    },
    endDate: {
      type: 'Date',
      value: booking.endDate,
    },
    amountGuests: {
      type: 'Integer',
      value: booking.amountGuests,
    },
    checkIn: {
      type: 'Date',
      value: booking.checkIn,
    },
    checkOut: {
      type: 'Date',
      value: booking.checkOut,
    },
    state: {
      type: 'String',
      value: booking.state,
    },
    enable: {
      type: 'Boolean',
      value: booking.enable,
    },
    createdAt: {
      type: 'Date',
      value: booking.createdAt,
    },
    updatedAt: {
      type: 'Date',
      value: booking.updatedAt,
    },
  };
};
