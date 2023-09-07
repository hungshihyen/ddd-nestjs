import { Controller } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { BAD_REQUEST_DATA, BAD_REQUEST_FORMAT } from './error.code';
import { SaveMoneyRequest } from './dtos';

@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  get(id: number): number {
    return this.walletService.get(id);
  }

  save(request: SaveMoneyRequest) {
    if (typeof request.amount !== 'number') {
      throw new Error(BAD_REQUEST_FORMAT);
    }

    if (request.amount <= 0) {
      throw new Error(BAD_REQUEST_DATA);
    }

    this.walletService.save(request);
  }
}
