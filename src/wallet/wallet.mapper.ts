import { WalletDbDto } from './dto/dto';

class WalletMapper {
  wallet = {};

  get(id: number): WalletDbDto {
    if (this.wallet[id] === undefined) {
      this.create(id);
    }
    return this.wallet[id];
  }

  save(walletDbDto: WalletDbDto) {
    if (this.wallet[walletDbDto.id] === undefined) {
      this.create(walletDbDto.id);
    }

    this.wallet[walletDbDto.id] = walletDbDto;
  }

  restore() {
    this.wallet = {};
  }

  private create(id: number) {
    this.wallet[id] = new WalletDbDto(id, 0);
  }
}

let instance: WalletMapper;

export default (() => {
  if (instance) {
    return instance;
  }

  instance = new WalletMapper();
  return instance;
})();
