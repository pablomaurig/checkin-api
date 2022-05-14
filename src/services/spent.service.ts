import boom from '@hapi/boom';
import { Spent } from '../entities/spent.entity';
import { CreateSpent } from '../types/spent.types';
import BookingService from '../services/booking.service';

const bookingService = new BookingService();

class SpentService {
  async createSpent(body: CreateSpent) {
    const { bookingId, description, amount } = body;
    const booking = await bookingService.getBookingById(bookingId);

    if (!booking.checkIn || booking.checkOut) {
      throw boom.badRequest('Can not create new spent to the booking');
    }

    const spent = new Spent();
    spent.bookingId = bookingId;
    spent.amount = amount;
    spent.description = description;
    spent.createdAt = new Date();
    await spent.save();

    return spent.id;
  }

  async getSpentsByBookingId(bookingId: number) {
    const spents = await Spent.findBy({ bookingId: bookingId });

    return spents;
  }

  async deleteSpent(id: number) {
    const spent = await Spent.findOneBy({ id: id });

    if (!spent) {
      throw boom.notFound('Spent does not exists');
    }

    await spent.remove();

    return spent;
  }
}

export default SpentService;
