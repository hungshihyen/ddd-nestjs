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

  save(user: User) {
    this.mapper[user.userId] = user;
  }

  find(userId: number): User {
    return this.mapper[userId];
  }

  create(user: User) {
    this.mapper[user.userId] = user;
  }
}

class CreateUserService {
  private userRepository: UserRepository;

  constructor(mapper: {}) {
    this.userRepository = new UserRepository(mapper);
  }

  create(userId: number) {
    const user = new User(userId, 0);
    this.userRepository.create(user);
  }
}

class SaveService {
  private userRepository: UserRepository;

  constructor(mapper: {}) {
    this.userRepository = new UserRepository(mapper);
  }

  save(userId: number, amount: number) {
    const user = this.userRepository.find(userId);

    user.amount += amount;

    this.userRepository.save(user);
  }
}

class GetBalanceService {
  private mapper: {};

  constructor(mapper: {}) {
    this.mapper = mapper;
  }

  get(userId: number): any {
    return this.mapper[userId].amount;
  }
}

@Controller('wallet')
export class WalletController {
  private mapper = {};
  private createUserService: CreateUserService;
  private saveService: SaveService;
  private getBalanceService: GetBalanceService;

  constructor() {
    this.createUserService = new CreateUserService(this.mapper);
    this.saveService = new SaveService(this.mapper);
    this.getBalanceService = new GetBalanceService(this.mapper);
  }

  create(userId: number) {
    this.createUserService.create(userId);
  }

  save(userId: number, amount: number) {
    this.saveService.save(userId, amount);
  }

  getBalance(userId: number): any {
    return this.getBalanceService.get(userId);
  }
}
