import { Controller } from '@nestjs/common';
import { SaveMoneyRequest } from './dtos';
import { BAD_REQUEST_DATA, BAD_REQUEST_FORMAT } from './error.code';
import { WalletService } from './wallet.service';

@Controller('wallet')
export class WalletController {
  constructor(private service: WalletService) {}

  get(id: number): number {
    return this.service.get(id);
  }

  save(request: SaveMoneyRequest): void {
    if (typeof request.amount !== 'number') {
      throw new Error(BAD_REQUEST_FORMAT);
    }

    if (request.amount <= 0) {
      throw new Error(BAD_REQUEST_DATA);
    }

    this.service.save(request);
  }
}
