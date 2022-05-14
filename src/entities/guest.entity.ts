import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Guest extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  gender: string;

  @Column()
  dateOfBirth: Date;

  @Column()
  telephoneNumber: string;

  @Column()
  country: string;

  @Column()
  idCardFront: string;

  @Column()
  idCardBack: string;

  @Column()
  bookingId: number;
}
