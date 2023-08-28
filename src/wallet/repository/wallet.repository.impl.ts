import { WalletRepository } from './wallet.repository';
import WalletMapper from './wallet.mapper';
import walletMapper from './wallet.mapper';

import { WalletDbDto } from '../dto/dto';
import { WalletEntity } from '../entity/entity';

export class WalletRepositoryImpl implements WalletRepository {
  get(id: number): WalletEntity {
    const walletDbDto = WalletMapper.get(id);
    return walletDbDto.toEntity();
  }

  save(wallet: WalletEntity): void {
    walletMapper.save(WalletDbDto.from(wallet));
  }
}
