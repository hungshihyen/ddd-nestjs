export class Wallet {
  id: number;
  amount: number;

  constructor(id: number, amount: number) {
    this.id = id;
    this.amount = amount;
  }

  add(amount: number) {
    this.amount += amount;
  }
}
