import { Request, Response, NextFunction } from 'express';
import BookingsService from '@services/booking.service';

const service = new BookingsService();

export const getBookings = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const bookings = await service.getBookings();

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
