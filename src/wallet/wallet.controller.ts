import { Controller, Inject, Injectable } from '@nestjs/common';

class User {
  userId: number;
  amount: number;

  constructor(userId: number, amount: number) {
    this.amount = amount;
    this.userId = userId;
  }

  addAmount(amount: number) {
    this.amount += amount;
  }
}

@Injectable()
export class UserRepository {
  mapper: {} = {};

  save(user: User) {
    this.mapper[user.userId] = user;
  }

  find(userId: number): User {
    const user = this.mapper[userId];
    if (user === undefined) {
      throw new Error('USER_NOT_FOUND');
    }

    return user;
  }

  create(user: User) {
    this.mapper[user.userId] = user;
  }
}

export const token = 'USER_REPOSI';

@Injectable()
export class CreateUserService {
  private userRepository: UserRepository;

  constructor(@Inject(token) userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  create(userId: number) {
    const user = new User(userId, 0);
    this.userRepository.create(user);
  }
}

export class SaveService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  save(userId: number, amount: number) {
    const user = this.userRepository.find(userId);

    user.addAmount(amount);

    this.userRepository.save(user);
  }
}

export class GetBalanceService {
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
  private createUserService: CreateUserService;
  private saveService: SaveService;
  private getBalanceService: GetBalanceService;

  constructor(
    createUserService: CreateUserService,
    saveService: SaveService,
    getBalanceService: GetBalanceService,
  ) {
    this.createUserService = createUserService;
    this.saveService = saveService;
    this.getBalanceService = getBalanceService;
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
