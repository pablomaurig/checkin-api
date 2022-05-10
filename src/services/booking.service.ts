import { Booking } from '../entities/booking.entity';
import { CreateBooking, BookingStatus } from '../types/booking.types';

class BookingService {
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
}
export default BookingService;
