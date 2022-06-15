import { Guest } from '../entities/guest.entity';
import { CreateGuest } from '../types/guest.types';
import { saveDataInOrion } from './fiware.service';
import { mapGuestDtoOrion } from '../dtos/index';

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

    await saveDataInOrion(mapGuestDtoOrion(guest));
  }
}

export default GuestService;
