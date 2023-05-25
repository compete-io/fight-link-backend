import { Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { EnvironmentService } from '../env/env.service';

@Injectable()
export class DatabaseService implements TypeOrmOptionsFactory {
  constructor(private readonly env: EnvironmentService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.env.get('DB_HOST'),
      port: parseInt(this.env.get('DB_PORT'), 10),
      username: this.env.get('DB_USERNAME'),
      password: this.env.get('DB_PASSWORD'),
      database: this.env.get('DB_DATABASE'),
      synchronize: true,
      entities: [__dirname + '/../../../**/*.entity{.ts,.js}'],
    };
  }
}
