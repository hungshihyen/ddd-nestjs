import { Body, Controller, Post } from '@nestjs/common';
import { CreateCatDto } from './create-cat.dto';
import { CatService } from '../service/cat.service';

@Controller('cat')
export class CatController {
  constructor(private readonly service: CatService) {}

  @Post()
  create(@Body() createCatDto: CreateCatDto): void {
    this.service.create(CreateCatDto.toEntity(createCatDto));
  }
}
