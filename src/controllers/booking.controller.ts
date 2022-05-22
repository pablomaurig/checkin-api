import { Request, Response, NextFunction } from 'express';
import BookingsService from '@services/booking.service';

const service = new BookingsService();

export const getBookings = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { bookingNumber, surname } = req.query;
    let bookings;
    if (bookingNumber && surname) {
      bookings = await service.getBookingByNumberAndSurname(
        bookingNumber.toString(),
        surname.toString()
      );
    } else {
      bookings = await service.getBookings();
    }

    res.json(bookings);
  } catch (error) {
    next(error);
  }
};

export const getBookingById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const booking = await service.getBookingById(parseInt(id));

    res.json(booking);
  } catch (error) {
    next(error);
  }
};

export const getBookingByNumberAndSurname = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { bookingNumber, surname } = req.query;
    let bookings;
    if (bookingNumber && surname) {
      bookings = await service.getBookingByNumberAndSurname(
        bookingNumber.toString(),
        surname.toString()
      );
    }

    res.json(bookings);
  } catch (error) {
    next(error);
  }
};

export const createBooking = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { bookingNumber, surname, startDate, endDate, amountGuests } =
      req.body;
    const id = await service.createBooking({
      bookingNumber,
      surname,
      startDate,
      endDate,
      amountGuests,
    });

    res.json(id);
  } catch (error) {
    next(error);
  }
};

export const updateBooking = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const booking = await service.updateBooking(parseInt(id), req.body);

    res.json(booking);
  } catch (error) {
    next(error);
  }
};

export const deleteBooking = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const booking = await service.deleteBooking(parseInt(id));

    res.json(booking);
  } catch (error) {
    next(error);
  }
};

export const checkIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { guests, bookingId } = req.body;

    await service.doCheckIn(guests, bookingId);

    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};

export const checkOut = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { bookingId } = req.body;

    await service.doCheckOut(bookingId);

    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};
