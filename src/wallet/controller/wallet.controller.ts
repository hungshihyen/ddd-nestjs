import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { WalletService } from '../service/wallet.service';
import { SaveWalletRequest, WalletResponse } from '../dto/dto';

class WithdrawRequest {
  amount: number;
  id: number;
}

@Controller('wallet')
export class WalletController {
  constructor(private service: WalletService) {}

  @Post()
  save(@Body() request: SaveWalletRequest) {
    this.service.save(request);
  }

  @Get(':id')
  get(@Param('id') id: number): WalletResponse {
    return this.service.get(id);
  }

  @Post('withdraw')
  withdraw(@Body() request: WithdrawRequest) {
    this.service.withdraw(request.id, request.amount);
  }
}
