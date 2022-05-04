export interface Room {
  id: number;
  floor: number;
  name: string;
  description: string;
  singleBeds: number;
  doubleBeds: number;
}

export type CreateRoom = Pick<
  Room,
  'floor' | 'name' | 'description' | 'singleBeds' | 'doubleBeds'
>;
