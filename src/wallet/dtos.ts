export class SaveMoneyRequest {
  id: number;
  amount: number;

  constructor(id: number, amount: any) {
    this.id = id;
    this.amount = amount;
  }
}
