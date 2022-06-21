import boom from '@hapi/boom';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { Booking } from '../entities/booking.entity';
import {
  Booking as BookingInterface,
  CreateBooking,
  BookingStatus,
} from '../types/booking.types';
import { Guest } from '../types/guest.types';
import GuestService from '../services/guest.service';
import UserService from '../services/user.service';
import { User } from '@entities/user.entity';
import {
  mapBookingDtoOrion,
  mapPropertiesBookingDtoOrion,
} from '../dtos/index';
import { saveDataInOrion, updateDataInOrion } from './fiware.service';
import { Room } from '@entities/room.entity';
const guestService = new GuestService();
const userService = new UserService();

class BookingService {
  async getBookings() {
    const bookings = await Booking.find();
    return bookings.filter(booking => {
      this.CheckState(booking);
      return booking.enable;
    });
  }

  async getBookingById(id: number) {
    const booking = await Booking.findOneBy({
      id: id,
      enable: true,
    });

    if (!booking) {
      throw boom.notFound('Booking not found');
    }

    if (booking?.roomId) {
      const room = await Room.findOneBy({
        id: booking?.roomId,
      });

      const bookingRoom = {
        ...booking,
        room: {
          ...room,
        },
      };

      return bookingRoom;
    }

    const bookingRoom = {
      ...booking,
      room: null,
    };

    return bookingRoom;
  }

  async getBookingByNumberAndSurname(bookingNumber: string, surname: string) {
    const booking = await Booking.findOneBy({
      bookingNumber: bookingNumber.toLowerCase(),
      surname: surname.toLowerCase(),
      enable: true,
    });
    if (!booking) {
      throw boom.notFound('No se encontro la reserva');
    }

    return booking;
  }

  async createBooking(body: CreateBooking) {
    const { bookingNumber, surname, startDate, endDate, amountGuests } = body;

    const booking = new Booking();
    booking.bookingNumber = bookingNumber.toLowerCase();
    booking.surname = surname.toLowerCase();
    booking.startDate = startDate;
    booking.endDate = endDate;
    booking.amountGuests = amountGuests;
    booking.state = BookingStatus.INP;
    booking.enable = true;

    await booking.save();

    await saveDataInOrion(mapBookingDtoOrion(booking));

    return booking.id;
  }

  async updateBooking(id: number, body: Partial<BookingInterface>) {
    const booking = await Booking.findOneBy({ id: id });
    if (!booking) {
      throw boom.notFound('Booking does not exists');
    }

    const updateBooking = { ...body, updatedAt: new Date() };

    await Booking.update(
      { id: id },
      updateBooking as QueryDeepPartialEntity<Booking>
    );

    const updatedBooking = await Booking.findOneBy({ id: id });

    if (updatedBooking) {
      await updateDataInOrion(
        id.toString(),
        mapPropertiesBookingDtoOrion(updatedBooking),
        'booking'
      );
    }

    return updatedBooking;
  }

  async deleteBooking(id: number) {
    const booking = await Booking.findOneBy({ id: id });
    if (!booking) {
      throw boom.notFound('Booking does not exists');
    }

    const updateBooking = { updatedAt: new Date(), enable: false };

    await Booking.update(
      { id: id },
      updateBooking as QueryDeepPartialEntity<Booking>
    );

    const user = await User.findOneBy({ bookingId: booking.id });

    if (user) {
      userService.updateUser(user.id, {
        bookingId: null,
      });
    }

    const updatedBooking = await Booking.findOneBy({ id: id });

    return updatedBooking;
  }

  async doCheckIn(guests: Guest[], bookingId: number) {
    const booking = await Booking.findOneBy({ id: bookingId });
    if (!booking || !booking.enable) {
      throw boom.notFound('Booking does not exists');
    }

    if (booking.state !== BookingStatus.INP) {
      throw boom.badRequest('Booking has already been checked in');
    }

    if (booking.amountGuests < guests.length) {
      throw boom.badRequest('Guests can not be more than the booking guests');
    }

    guests.forEach(guest => {
      console.log(guest);
      guestService.createGuest(guest, bookingId);
    });
    const updatedBooking = await this.updateBooking(bookingId, {
      checkIn: new Date(),
      state: BookingStatus.IND,
    });

    if (updatedBooking) {
      this.CheckState(updatedBooking);
    }
  }

  async doCheckOut(bookingId: number) {
    const booking = await Booking.findOneBy({ id: bookingId });

    const user = await User.findOneBy({ bookingId: bookingId });

    if (!booking || !booking.enable) {
      throw boom.notFound('Booking does not exists');
    }

    if (booking.state === BookingStatus.OUTD) {
      throw boom.badRequest('Booking has already been checked out');
    }

    if (!user) {
      throw boom.notFound('User does not exists');
    }

    if (user.bookingId === null) {
      throw boom.badRequest('The User does not have a booking assigned');
    }

    this.updateBooking(bookingId, {
      checkOut: new Date(),
      state: BookingStatus.OUTD,
    });

    userService.updateUser(user.id, {
      bookingId: null,
    });
  }

  async CheckState(booking: Booking) {
    if (booking.state === BookingStatus.IND) {
      const fecha = booking.endDate;
      const dias = -3;
      const hoy = new Date();

      fecha.setDate(fecha.getDate() + dias);

      const body = { state: BookingStatus.OUTP };

      if (fecha <= hoy) {
        this.updateBooking(booking.id, body);
      }
    }
  }
}

export default BookingService;
