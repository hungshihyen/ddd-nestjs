import { Module } from '@nestjs/common';
import { WalletController } from './controller/wallet.controller';
import { WalletService } from './service/wallet.service';
import { WalletRepositoryImpl } from './repository/wallet.repository.impl';
import { WALLET_REPOSITORY } from './wallet.di-tokens';

@Module({
  controllers: [WalletController],
  providers: [
    { useClass: WalletRepositoryImpl, provide: WALLET_REPOSITORY },
    WalletService,
  ],
})
export class WalletModule {}
