export class WalletEntity {
  id: number;
  balance: number;

  constructor(id: number, balance: number) {
    this.id = id;
    this.balance = balance;
  }

  deduct(amount: number) {
    this.balance -= amount;
  }
}
