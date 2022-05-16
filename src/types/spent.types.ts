export interface Spent {
  bookingId: number;
  description: string;
  amount: number;
}

export type CreateSpent = Pick<Spent, 'bookingId' | 'description' | 'amount'>;
