import { Wallet } from './wallet.entity';
import { Injectable } from '@nestjs/common';

export interface WalletRepository {
  save(wallet: Wallet): void;

  find(id: number): Wallet;
}

@Injectable()
export class WalletRepositoryImpl implements WalletRepository {
  store = {
    1: new Wallet(1, 0),
  };

  find(id: number): Wallet {
    return this.store[id];
  }

  save(wallet: Wallet): void {
    this.store[wallet.id] = wallet;
  }
}

export const WALLET_REPOSITORY_TOKEN = 'WALLET_REPOSITORY_TOKEN';
