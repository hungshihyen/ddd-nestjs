import { Controller } from '@nestjs/common';
import { GetWalletResponse, SaveMoneyDto } from './wallet.controller.spec';
import {
  BAD_REQUEST_DATA,
  BAD_REQUEST_FORMAT,
  WalletService,
} from './wallet.service';

@Controller('wallet')
export class WalletController {
  constructor(private service: WalletService) {}

  get(id: number): GetWalletResponse {
    return this.service.get(id);
  }

  save(request: SaveMoneyDto) {
    if (typeof request.amount !== 'number') {
      throw new Error(BAD_REQUEST_FORMAT);
    }

    if (request.amount <= 0) {
      throw new Error(BAD_REQUEST_DATA);
    }

    this.service.save(request);
  }
}
