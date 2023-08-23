import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateCatDto } from './create-cat.dto';
import { UpdateCatDto } from './cat-update-dto';
import { CatService } from './cat.service';

class ListAllEntities {
  limit: number;
}

// command: "nest g controller cats" to create a controller
@Controller('cats')
export class CatController {
  constructor(private readonly service: CatService) {}

  @Post()
  create(@Body() createCatDto: CreateCatDto): void {
    this.service.create(CreateCatDto.toEntity(createCatDto));
  }

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
