import { Controller, Get, Param, Query } from '@nestjs/common';

class ListAllEntities {
  limit: number;
}

// command: "nest g controller cats" to create a controller
@Controller('cat')
export class CatController {
  constructor() {}

  @Get()
  findAll(@Query() query: ListAllEntities) {
    return `This action returns all cats (limit: ${query.limit} items)`;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `This action returns a #${id} cat`;
  }
}
