import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transfer } from './transfer.entity';
import { TransferService } from './transfer.service';
import { TransferController } from './transfer.controller';
import { Vehicle } from '../vehicle/vehicle.entity';
import { Driver } from 'src/driver/driver.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Transfer, Vehicle, Driver])],
  providers: [TransferService],
  controllers: [TransferController],
  exports: [TransferService],
})
export class TransferModule {}
