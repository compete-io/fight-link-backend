import { join } from 'path';
import { Module } from '@nestjs/common';
import { EnvironmentService } from './env.service';

@Module({
  providers: [
    {
      provide: EnvironmentService,
      useValue: new EnvironmentService(join(process.cwd(), '.env')),
    },
  ],
  exports: [EnvironmentService],
})
export class EnvironmentModule {}
