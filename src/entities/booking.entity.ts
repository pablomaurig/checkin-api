import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Room } from './room.entity';

@Entity()
export class Booking extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: true,
  })
  roomId: number;

  @Column()
  bookingNumber: string;

  @Column()
  surname: string;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column()
  amountGuests: number;

  @Column({
    nullable: true,
  })
  checkIn: Date;

  @Column({
    nullable: true,
  })
  checkOut: Date;

  @Column()
  state: string;

  @Column()
  enable: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Room, room => room.bookings)
  room: Room;
}
