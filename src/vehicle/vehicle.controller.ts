import {
  Controller,
  Get,
  Post,
  Body,
  UseInterceptors,
  UploadedFiles,
  BadRequestException,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { VehicleService } from './vehicle.service';
import { Vehicle } from './vehicle.entity';
import { createVehicleDto } from './create-vehicle.dto';
@Controller('vehicles')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @Get()
  findAll(): Promise<Vehicle[]> {
    return this.vehicleService.findAll();
  }

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'puc_certificate', maxCount: 1 },
        { name: 'insurance_certificate', maxCount: 1 },
      ],
      {
        dest: 'uploads/',
        fileFilter: (req, file, cb) => {
          if (file.mimetype === 'application/pdf') {
            cb(null, true);
          } else {
            cb(new Error('Invalid file type, only PDF is allowed!'), false);
          }
        },
      },
    ),
  )
  create(
    @Body() createVehicleDto: createVehicleDto,
    @UploadedFiles() files: { puc_certificate?: Express.Multer.File[], insurance_certificate?: Express.Multer.File[] },
  ): Promise<Vehicle> {
    if (!files.puc_certificate || !files.insurance_certificate) {
      throw new BadRequestException('Required files are missing');
    }
    createVehicleDto.puc_certificate = files.puc_certificate[0].path;
    createVehicleDto.insurance_certificate = files.insurance_certificate[0].path;
    const vehicle = new Vehicle();
    vehicle.vehicle_type = createVehicleDto.vehicle_type;
    vehicle.vehicle_number = createVehicleDto.vehicle_number;
    vehicle.puc_certificate = createVehicleDto.puc_certificate;
    vehicle.insurance_certificate = createVehicleDto.insurance_certificate;
    return this.vehicleService.create(vehicle);
  }
}
