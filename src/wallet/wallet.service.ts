import { Inject, Injectable } from '@nestjs/common';
import { USER_LOCKED, USER_NOT_FOUND } from './error.code';
import { USER_REPOSITORY_TOKEN, UserRepository } from './user.repository';
import { User } from './user.entity';
import { WALLET_REPOSITORY_TOKEN, WalletRepository } from './wallet.repository';
import { SaveMoneyRequest } from './dtos';

@Injectable()
export class WalletService {
  constructor(
    @Inject(USER_REPOSITORY_TOKEN) private userRepository: UserRepository,
    @Inject(WALLET_REPOSITORY_TOKEN) private walletRepository: WalletRepository,
  ) {}

  save(request: SaveMoneyRequest) {
    const user: User = this.userRepository.find(request.id);

    if (user === undefined) {
      throw new Error(USER_NOT_FOUND);
    }

    if (user.isLocked) {
      throw new Error(USER_LOCKED);
    }

    const wallet = this.walletRepository.find(request.id);

    wallet.add(request.amount);

    this.walletRepository.save(wallet);
  }

  get(id: number) {
    return this.walletRepository.find(id).amount;
  }
}
