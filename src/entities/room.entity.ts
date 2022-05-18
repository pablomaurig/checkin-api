import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Booking } from './booking.entity';

@Entity()
export class Room extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  floor: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  singleBeds: number;

  @Column()
  doubleBeds: number;

  @Column()
  enable: boolean;

  @OneToMany(() => Booking, booking => booking.room)
  bookings: Booking[];
}
