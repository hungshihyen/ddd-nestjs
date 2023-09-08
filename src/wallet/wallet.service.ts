import { Inject, Injectable } from '@nestjs/common';
import { SaveMoneyRequest } from './dtos';
import { USER_LOCKED, USER_NOT_FOUND } from './error.code';
import { UserRepository } from './user.repository';
import { WalletRepository } from './wallet.reppsitory';
import { Wallet } from './wallet.entity';

export class User {
  isLocked: boolean;

  constructor(isLocked: boolean) {
    this.isLocked = isLocked;
  }
}

export const USER_REPOSITORY_TOKEN = 'USER_REPOSITORY';

export const WALLET_REPOSITORY_TOKEN = 'WALLET_REPOSITORY_TOKEN';

@Injectable()
export class WalletService {
  constructor(
    @Inject(USER_REPOSITORY_TOKEN) private userRepository: UserRepository,
    @Inject(WALLET_REPOSITORY_TOKEN) private walletRepository: WalletRepository,
  ) {}

  get(id: number): number {
    return this.walletRepository.find(id).amount;
  }

  save(request: SaveMoneyRequest) {
    const user: User = this.userRepository.find(request.id);

    if (!user) {
      throw new Error(USER_NOT_FOUND);
    }

    if (user.isLocked) {
      throw new Error(USER_LOCKED);
    }

    const wallet: Wallet = this.walletRepository.find(request.id);

    wallet.add(request.amount);

    this.walletRepository.save(wallet);
  }
}
