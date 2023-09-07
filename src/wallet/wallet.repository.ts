import { WalletEntity } from './wallet.entity';

export interface WalletRepository {
  save(wallet: WalletEntity): void;

  find(id: number): WalletEntity;
}
