import { Global, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InfrastructureModule } from './infrastracture/infrastructure.module';
import { CoreModule } from './application/core.module';
import { ConfigModule } from '@nestjs/config';

@Global()
@Module({
  imports: [
    InfrastructureModule,
    CoreModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
