/* eslint-disable no-unused-vars */
export interface Booking {
  id: string;
  roomId: string;
  bookingNumber: string;
  surname: string;
  startDate: Date;
  endDate: Date;
  amountGuests: number;
  checkIn: Date;
  checkOut: Date;
  state: string;
  enable: boolean;
}

export enum BookingStatus {
  INP = 'CheckIn Pending',
  OUTP = 'CheckOut Pending',
  IND = 'CheckIn Done',
  OUTD = 'CheckOut Done',
}

export type CreateBooking = Pick<
  Booking,
  'bookingNumber' | 'surname' | 'startDate' | 'endDate' | 'amountGuests'
>;
