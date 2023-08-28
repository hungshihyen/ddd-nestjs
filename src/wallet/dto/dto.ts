import { WalletEntity } from '../entity/entity';

export class SaveWalletRequest {
  id: number;
  balance: number;
}

export type WithdrawRequest = { amount: number; id: number };

export interface WalletDto {
  id: number;
  balance: number;
}

export class WalletDbDto {
  id: number;
  balance: number;

  constructor(id: number, balance: number) {
    this.id = id;
    this.balance = balance;
  }

  static from(wallet: WalletEntity) {
    return new WalletDbDto(wallet.id, wallet.balance);
  }

  toEntity() {
    return new WalletEntity(this.id, this.balance);
  }
}

export class WalletResponse {
  id: number;
  balance: number;

  constructor(id: number, balance: number) {
    this.id = id;
    this.balance = balance;
  }
}
