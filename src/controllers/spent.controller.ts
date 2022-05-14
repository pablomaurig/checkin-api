import { Request, Response, NextFunction } from 'express';
import SpentService from '@services/spent.service';
import BookingService from '@services/booking.service';

const service = new SpentService();
const bookingService = new BookingService();

export const createSpent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { bookingId, description, amount } = req.body;
    const id = await service.createSpent({
      bookingId,
      description,
      amount,
    });

    res.json(id);
  } catch (error) {
    next(error);
  }
};

export const getSpentsByBooking = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { bookingId } = req.params;
    await bookingService.getBookingById(parseInt(bookingId));

    const spents = await service.getSpentsByBookingId(parseInt(bookingId));

    res.json(spents);
  } catch (error) {
    next(error);
  }
};

export const deleteSpent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const spent = await service.deleteSpent(parseInt(id));

    res.json(spent);
  } catch (error) {
    next(error);
  }
};
