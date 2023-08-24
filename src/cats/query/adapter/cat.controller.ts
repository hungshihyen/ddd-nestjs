import { Controller, Get, Param, Query } from '@nestjs/common';
import { CatService } from '../../command/service/cat.service';

class ListAllEntities {
  limit: number;
}

// command: "nest g controller cats" to create a controller
@Controller('cats')
export class CatController {
  constructor(private readonly service: CatService) {}

  @Get()
  findAll(@Query() query: ListAllEntities) {
    return `This action returns all cats (limit: ${query.limit} items)`;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `This action returns a #${id} cat`;
  }
}
