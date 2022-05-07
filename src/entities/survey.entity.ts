import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Survey extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  bookingId: number;

  @Column({
    nullable: true,
  })
  answer1: string;

  @Column({
    nullable: true,
  })
  answer2: string;

  @Column({
    nullable: true,
  })
  answer3: string;

  @CreateDateColumn()
  createdAt: Date;
}
