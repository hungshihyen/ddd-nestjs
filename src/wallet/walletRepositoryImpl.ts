import { Wallet } from './wallet.entity';
import { WalletRepository } from './wallet.reppsitory';

export class WalletRepositoryImpl implements WalletRepository {
  store = {};

  find(id: number): Wallet {
    return this.store[id];
  }

  save(wallet: Wallet): void {
    this.store[wallet.id] = wallet;
  }
}
