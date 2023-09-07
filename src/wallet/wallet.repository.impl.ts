import { WalletEntity } from './wallet.entity';
import { WalletRepository } from './wallet.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class WalletRepositoryImpl implements WalletRepository {
  private store = {
    1: new WalletEntity(1, 0),
    2: new WalletEntity(2, 0),
  };

  find(id: number): WalletEntity {
    return this.store[id];
  }

  save(wallet: WalletEntity): void {
    this.store[wallet.id] = wallet;
  }
}
