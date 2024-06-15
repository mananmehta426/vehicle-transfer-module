import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { DriverModule } from './driver/driver.module';
import { VehicleModule } from './vehicle/vehicle.module';
import { TransferModule } from './transfer/transfer.module';
import { Driver } from './driver/driver.entity';
import { Vehicle } from './vehicle/vehicle.entity';
import { Transfer } from './transfer/transfer.entity';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // This makes the ConfigModule global, no need to import it in other modules
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'), // Adjusted to serve the uploads folder correctly
      serveRoot: '/uploads', // Optional: serve under /uploads
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        ssl: true,
        host: configService.get<string>('PG_HOST'),
        port: configService.get<number>('PG_PORT'),
        username: configService.get<string>('PG_USER'),
        password: configService.get<string>('PG_PASSWORD'),
        database: configService.get<string>('PG_DATABASE'),
        entities: [Driver, Vehicle, Transfer],
        synchronize: true, // This will create tables automatically, set to false in production
      }),
      inject: [ConfigService],
    }), 
    MulterModule.registerAsync({
      useFactory: () => ({
        dest: './uploads',
      }),
    }),
    DriverModule,
    VehicleModule,
    TransferModule,
  ],
})
export class AppModule {}
