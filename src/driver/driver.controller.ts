import { Controller, Get, Post, Body, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DriverService } from './driver.service';
import { Driver } from './driver.entity';
import { Express } from 'express';
import { CreateDriverDto } from './create-driver.dto';

@Controller('drivers')
export class DriverController {
  constructor(private readonly driverService: DriverService) {}

  @Get()
  findAll(): Promise<Driver[]> {
    return this.driverService.findAll();
  }

  
  @Post()
  @UseInterceptors(FileInterceptor('profile_photo', { dest: 'uploads/' }))
  async create(@Body() createDriverDto: CreateDriverDto, @UploadedFile() file: Express.Multer.File): Promise<Driver> {
    if (file) {
      const driver = new Driver();
      driver.name = createDriverDto.name;
      driver.phoneNumber = createDriverDto.phoneNumber;
      driver.profile_photo = file.path;

      return await this.driverService.create(driver);
    } else {
      throw new BadRequestException('No file found');
    }
  }
}
