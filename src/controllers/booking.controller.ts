import { Request, Response, NextFunction } from 'express';
import BookingsService from '@services/booking.service';

const service = new BookingsService();

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
