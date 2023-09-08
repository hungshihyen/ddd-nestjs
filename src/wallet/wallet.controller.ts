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

class SaveService {
  mapper: {};

  constructor(mapper: {}) {
    this.mapper = mapper;
  }

  save(userId: number, amount: number) {
    const user = this.mapper[userId];
    user.amount += amount;

    this.mapper[userId] = user;
  }
}

@Controller('wallet')
export class WalletController {
  private mapper = {};
  private createUserService: CreateUserService;
  private saveService: SaveService;

  constructor() {
    this.createUserService = new CreateUserService(this.mapper);
    this.saveService = new SaveService(this.mapper);
  }

  create(userId: number) {
    this.createUserService.create(userId);
  }

  save(userId: number, amount: number) {
    this.saveService.save(userId, amount);
  }

  getBalance(userId: number): any {
    return this.mapper[userId].amount;
  }
}