import { IsString, Length } from 'class-validator';

export class CreateDriverDto {
  @IsString()
  name: string;

  @IsString()
  @Length(10, 10, { message: 'Phone number must be exactly 10 characters long' })
  phoneNumber: string;

}
