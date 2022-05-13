export interface Guest {
  id: number;
  firstName: string;
  lastName: string;
  gender: string;
  dateOfBirth: Date;
  telephoneNumber: string;
  idCardFront: string;
  idCardBack: string;
  country: string;
}

export type CreateGuest = Pick<
  Guest,
  | 'firstName'
  | 'lastName'
  | 'gender'
  | 'dateOfBirth'
  | 'telephoneNumber'
  | 'idCardFront'
  | 'idCardBack'
  | 'country'
>;
