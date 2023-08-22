import { Controller, Get } from '@nestjs/common';
import { AppService } from '../app.service';

// command: nest g controller cats to create a controller
@Controller('cats')
export class CatsController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getCats(): string {
    return this.appService.getCats();
  }
}
