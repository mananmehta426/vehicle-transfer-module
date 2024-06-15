import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn } from 'typeorm';
import { Vehicle } from '../vehicle/vehicle.entity';
import { Transfer } from '../transfer/transfer.entity';

@Entity()
export class Driver {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  phoneNumber: string;

  @Column()
  profile_photo: string;

  @OneToMany(() => Vehicle, vehicle => vehicle.current_driver)
  vehicles: Vehicle[];

  @OneToMany(() => Transfer, transfer => transfer.from_driver)
  transfersFrom: Transfer[];

  @OneToMany(() => Transfer, transfer => transfer.to_driver)
  transfersTo: Transfer[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
