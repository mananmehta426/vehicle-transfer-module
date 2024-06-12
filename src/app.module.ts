import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DriverModule } from './driver/driver.module';
import { VehicleModule } from './vehicle/vehicle.module';
import { TransferModule } from './transfer/transfer.module';

@Module({
  imports: [DriverModule, VehicleModule, TransferModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
