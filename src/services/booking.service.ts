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

const guestService = new GuestService();
const userService = new UserService();

class BookingService {
  async getBookings() {
    const bookings = await Booking.find();
    return bookings.filter(booking => {
      return booking.enable;
    });
  }

  async getBookingById(id: number) {
    const booking = await Booking.findOneBy({
      id: id,
      enable: true,
    });

    console.log('booking ' + booking);

    if (!booking) {
      throw boom.notFound('Booking not found');
    }

    return booking;
  }

  async getBookingByNumberAndSurname(bookingNumber: string, surname: string) {
    const booking = await Booking.findOneBy({
      bookingNumber: bookingNumber.toLowerCase(),
      surname: surname.toLowerCase(),
      enable: true,
    });
    if (!booking) {
      throw boom.notFound('Booking not found');
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
    this.updateBooking(bookingId, {
      checkIn: new Date(),
      state: BookingStatus.IND,
    });
  }

  async doCheckOut(bookingId: number) {
    const booking = await Booking.findOneBy({ id: bookingId });

    const users = await userService.getUsers();

    const user = await users.filter(user => (user.bookingId = bookingId));

    if (!booking || !booking.enable) {
      throw boom.notFound('Booking does not exists');
    }

    if (booking.state === BookingStatus.OUTD) {
      throw boom.badRequest('Booking has already been checked out');
    }

    this.updateBooking(bookingId, {
      checkOut: new Date(),
      state: BookingStatus.OUTD,
    });

    userService.updateUser(user.id, {
      checkIn: new Date(),
      state: BookingStatus.IND,
    });
  }
}

export default BookingService;
