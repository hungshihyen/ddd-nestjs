import { Controller } from '@nestjs/common';

class User {
  userId: number;
  amount: number;

  constructor(userId: number, amount: number) {
    this.amount = amount;
    this.userId = userId;
  }
}

class UserRepository {
  mapper: {};

  constructor(mapper: {}) {
    this.mapper = mapper;
  }

  create(user: User) {
    this.mapper[user.userId] = user;
  }
}

class CreateUserService {
  private mapper: {};
  private userRepository: UserRepository;

  constructor(mapper: {}) {
    this.mapper = mapper;
    this.userRepository = new UserRepository(this.mapper);
  }

  create(userId: number) {
    const user = new User(userId, 0);
    this.userRepository.create(user);
  }
}

@Controller('wallet')
export class WalletController {
  private mapper = {};
  private createUserService: CreateUserService;

  constructor() {
    this.createUserService = new CreateUserService(this.mapper);
  }

  create(userId: number) {
    this.createUserService.create(userId);
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
