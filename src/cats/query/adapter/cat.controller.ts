import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Query,
} from '@nestjs/common';
import { UpdateCatDto } from '../../command/adapter/cat-update-dto';
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

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
    return `This action updates a #${id} cat with name ${updateCatDto.name}, age ${updateCatDto.age}, breed ${updateCatDto.breed}`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id} cat`;
  }
}
