import boom from '@hapi/boom';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { Booking } from '../entities/booking.entity';
import {
  Booking as BookingInterface,
  CreateBooking,
  BookingStatus,
} from '../types/booking.types';

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
    if (!booking) {
      throw boom.notFound('Booking not found');
    }

    return booking;
  }

  async getBookingByNumberAndSurname(bookingNumber: string, surname: string) {
    const booking = await Booking.findOneBy({
      bookingNumber: bookingNumber,
      surname: surname,
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
    booking.bookingNumber = bookingNumber;
    booking.surname = surname;
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
}

export default BookingService;
