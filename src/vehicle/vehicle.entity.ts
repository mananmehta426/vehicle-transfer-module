import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn } from 'typeorm';
import { Driver } from '../driver/driver.entity';
import { Transfer } from '../transfer/transfer.entity';

@Entity()
export class Vehicle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  vehicle_number: string;

  @Column()
  vehicle_type: string;

  @Column()
  puc_certificate: string;

  @Column()
  insurance_certificate: string;

  @ManyToOne(() => Driver, driver => driver.vehicles, { nullable: true })
  current_driver: Driver;

  @OneToMany(() => Transfer, transfer => transfer.vehicle)
  transfers: Transfer[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
