import { Inject, Injectable } from '@nestjs/common';
import { GetWalletResponse, SaveMoneyDto } from './wallet.controller.spec';
import { WalletRepository } from './wallet.repository';
import { WalletEntity } from './wallet.entity';
import { UserRepository } from './user.repository';

export const WALLET_REPOSITORY_TOKEN = 'WALLET_REPOSITORY';

export const USER_NOT_FOUND = 'User not found';
export const USER_LOCKED = 'User locked';
export const BAD_REQUEST_DATA = 'Bad request data';
export const BAD_REQUEST_FORMAT = 'Bad request format';

export const USER_REPOSITORY_TOKEN = 'USER_REPOSITORY';

@Injectable()
export class WalletService {
  constructor(
    @Inject(WALLET_REPOSITORY_TOKEN) private repository: WalletRepository,
    @Inject(USER_REPOSITORY_TOKEN) private userRepository: UserRepository,
  ) {}

  get(id: number): GetWalletResponse {
    const walletEntity = this.repository.find(id);
    return new GetWalletResponse(walletEntity.id, walletEntity.amount);
  }

  save(request: SaveMoneyDto) {
    const user = this.userRepository.find(request.id);

    if (user === undefined) {
      throw new Error(USER_NOT_FOUND);
    }

    if (user.isLocked) {
      throw new Error(USER_LOCKED);
    }

    const wallet: WalletEntity = this.repository.find(request.id);

    wallet.add(request.amount);

    this.repository.save(wallet);
  }
}
