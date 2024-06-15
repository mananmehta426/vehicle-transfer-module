import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Vehicle } from '../vehicle/vehicle.entity';
import { Driver } from '../driver/driver.entity';

@Entity()
export class Transfer {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Vehicle, vehicle => vehicle.transfers)
  vehicle: Vehicle;

  @ManyToOne(() => Driver, driver => driver.transfersFrom)
  from_driver: Driver;

  @ManyToOne(() => Driver, driver => driver.transfersTo)
  to_driver: Driver;

  @CreateDateColumn({ type: 'timestamp' })
  transfer_date: Date;

  @Column()
  from_entity_type: string;

  @Column()
  from_entity_id: number;

  @Column()
  to_entity_type: string;

  @Column()
  to_entity_id: number;
}
