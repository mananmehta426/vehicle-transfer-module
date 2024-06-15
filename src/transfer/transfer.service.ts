import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transfer } from './transfer.entity';
import { Vehicle } from '../vehicle/vehicle.entity';
import { Driver } from '../driver/driver.entity';

@Injectable()
export class TransferService {
  constructor(
    @InjectRepository(Transfer)
    private transferRepository: Repository<Transfer>,
    @InjectRepository(Vehicle)
    private vehicleRepository: Repository<Vehicle>,
    @InjectRepository(Driver)
    private driverRepository: Repository<Driver>,
  ) {}
  async transferVehicle(
    vehicleId: number,
    fromEntity: { id: number; type: string },
    toEntity: { id: number; type: string },
  ): Promise<Transfer> {
    const vehicle = await this.vehicleRepository.findOne({
      where: { id: vehicleId },
      relations: ['current_driver'],
    });
  
    if (!vehicle) {
      throw new Error('Vehicle not found');
    }
  
    let fromEntityObj: any, toEntityObj: any;
  
    // Validate and find 'from' entity
    if (fromEntity.type === 'driver') {
      fromEntityObj = await this.driverRepository.findOne({
        where: { id: fromEntity.id },
      });
      if (!fromEntityObj) {
        throw new BadRequestException('From driver not found');
      }
      if (
        vehicle.current_driver &&
        vehicle.current_driver.id !== fromEntity.id
      ) {
        throw new BadRequestException(
          'The current driver does not match the fromEntityId',
        );
      }
    } else {
      throw new BadRequestException('Unsupported from entity type');
    }
  
    // Validate and find 'to' entity
    if (toEntity.type === 'driver') {
      toEntityObj = await this.driverRepository.findOne({
        where: { id: toEntity.id },
      });
      if (!toEntityObj) {
        throw new BadRequestException('To driver not found');
      }
    } else {
      throw new BadRequestException('Unsupported to entity type');
    }
  
    // Check if fromEntity.id and toEntity.id are not the same
    if (fromEntity.id === toEntity.id) {
      throw new BadRequestException('From and To entities cannot be the same');
    }
  
    // Perform the transfer
    vehicle.current_driver = toEntityObj;
    await this.vehicleRepository.save(vehicle);
  
    // Create a new transfer record
    const transfer = new Transfer();
    transfer.vehicle = vehicle;
    transfer.from_entity_type = fromEntity.type;
    transfer.from_entity_id = fromEntity.id;
    transfer.to_entity_type = toEntity.type;
    transfer.to_entity_id = toEntity.id;
    transfer.transfer_date = new Date();
    transfer.from_driver = fromEntityObj;
    transfer.to_driver = toEntityObj;
  
    // Save and return the transfer record
    return this.transferRepository.save(transfer);
  }  
  
  findAll(): Promise<Transfer[]> {
    return this.transferRepository.find({
      relations: ['vehicle', 'from_driver', 'to_driver'],
      order: {
        transfer_date: 'DESC',
      },
    });
  }

  findTransfersByVehicle(vehicleId: number): Promise<Transfer[]> {
    return this.transferRepository.find({
      where: { vehicle: { id: vehicleId } },
      relations: ['vehicle', 'from_driver', 'to_driver'],
      order: {
        transfer_date: 'DESC',
      },
    });
  }
}
