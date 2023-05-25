import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnvironmentModule } from '../env/env.module';
import { DatabaseService } from './database.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [EnvironmentModule],
      useClass: DatabaseService,
    }),
    EnvironmentModule,
  ],
  exports: [],
})
export class DatabaseModule {}
