import { Controller } from '@nestjs/common';

class User {
  userId: number;
  amount: number;

  constructor(userId: number, amount: number) {
    this.amount = amount;
    this.userId = userId;
  }
}

@Controller('wallet')
export class WalletController {
  private mapper = {};

  create(userId: number) {
    const user = new User(userId, 0);
    this.mapper[userId] = user;
  }

  save(userId: number, amount: number) {
    const user = this.mapper[userId];
    user.amount += amount;

    this.mapper[userId] = user;
  }

  getBalance(userId: number): any {
    return this.mapper[userId].amount;
  }
}
