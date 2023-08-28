import { SaveWalletRequest, WalletResponse } from '../dto/dto';

export class WalletEntity {
  id: number;
  balance: number;

  constructor(id: number, balance: number) {
    this.id = id;
    this.balance = balance;
  }

  static from(request: SaveWalletRequest) {
    return new WalletEntity(request.id, request.balance);
  }

  toResponse() {
    return new WalletResponse(this.id, this.balance);
  }

  deduct(amount: number) {
    this.balance -= amount;
  }
}
