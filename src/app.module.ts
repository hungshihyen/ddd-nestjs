import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatModule } from './cat/cat.module';
import { WalletModule } from './wallet/wallet.module';

@Module({
  imports: [CatModule, WalletModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
