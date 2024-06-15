// vehicle.dto.ts
import { IsOptional, IsString } from 'class-validator';

export class createVehicleDto {
  @IsString()
  vehicle_type: string;

  @IsString()
  vehicle_number: string;

  @IsString()
  @IsOptional()
  puc_certificate: string;

  @IsString()
  @IsOptional()
  insurance_certificate: string;

}