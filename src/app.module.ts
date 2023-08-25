import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatModule } from './cats/cat.module';
import { HhhService } from './hhh/hhh.service';

@Module({
  imports: [CatModule],
  controllers: [AppController],
  providers: [AppService, HhhService],
})
export class AppModule {}
