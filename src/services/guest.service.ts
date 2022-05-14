import { Guest } from '../entities/guest.entity';
import { CreateGuest } from '../types/guest.types';

class GuestService {
  async createGuest(body: CreateGuest, bookingId: number) {
    const {
      firstName,
      lastName,
      gender,
      dateOfBirth,
      telephoneNumber,
      country,
      idCardFront,
      idCardBack,
    } = body;

    const guest = new Guest();
    guest.firstName = firstName;
    guest.lastName = lastName;
    guest.gender = gender;
    guest.dateOfBirth = dateOfBirth;
    guest.telephoneNumber = telephoneNumber;
    guest.idCardFront = idCardFront;
    guest.country = country;
    guest.idCardBack = idCardBack;
    guest.bookingId = bookingId;

    await guest.save();
  }
}

export default GuestService;
