import { Module } from '@nestjs/common';
import { DatabaseModule } from './infrastructure/config/database/database.module';
import { CoreModule } from './application/core.module';

@Module({
  imports: [DatabaseModule, CoreModule],
})
export class AppModule {}
