import { Wallet } from './wallet.entity';

export interface WalletRepository {
  store: object;

  save(wallet: Wallet): void;

  find(id: number): Wallet;
}
