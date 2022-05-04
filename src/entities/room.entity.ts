import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
