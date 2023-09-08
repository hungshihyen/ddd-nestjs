import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatModule } from './cat/cat.module';
import { WalletController } from './wallet/wallet.controller';

@Module({
  imports: [CatModule],
  controllers: [AppController, WalletController],
  providers: [AppService],
})
export class AppModule {}
