import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { TransferService } from './transfer.service';
import { Transfer } from './transfer.entity';

@Controller('transfers')
export class TransferController {
  constructor(private readonly transferService: TransferService) {}

  @Post()
  transferVehicle(
    @Body('vehicleId') vehicleId: number,
    @Body('fromEntity') fromEntity: { id: number; type: string },
    @Body('toEntity') toEntity: { id: number; type: string },
  ): Promise<Transfer> {
    return this.transferService.transferVehicle(vehicleId, fromEntity, toEntity);
  }

  @Get()
  findAll(): Promise<Transfer[]> {
    return this.transferService.findAll();
  }

  @Get('vehicle/:id')
  findTransfersByVehicle(@Param('id') id: number): Promise<Transfer[]> {
    return this.transferService.findTransfersByVehicle(id);
  }
}
