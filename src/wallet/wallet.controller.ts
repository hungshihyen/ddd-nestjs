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

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  create(userId: number) {
    const user = new User(userId, 0);
    this.userRepository.create(user);
  }
}

class SaveService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  save(userId: number, amount: number) {
    const user = this.userRepository.find(userId);

    user.amount += amount;

    this.userRepository.save(user);
  }
}

class GetBalanceService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  get(userId: number): any {
    return this.userRepository.find(userId).amount;
  }
}

@Controller('wallet')
export class WalletController {
  private mapper = {};
  private createUserService: CreateUserService;
  private saveService: SaveService;
  private getBalanceService: GetBalanceService;

  constructor() {
    this.createUserService = new CreateUserService(
      new UserRepository(this.mapper),
    );
    this.saveService = new SaveService(new UserRepository(this.mapper));
    this.getBalanceService = new GetBalanceService(
      new UserRepository(this.mapper),
    );
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
