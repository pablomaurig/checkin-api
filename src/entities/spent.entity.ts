import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Spent extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  bookingId: number;

  @Column()
  description: string;

  @Column()
  amount: number;

  @CreateDateColumn()
  createdAt: Date;
}
