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
import { AppService } from '../app.service';
import { CreateCatDto } from './create-cat.dto';
import { UpdateCatDto } from './cat-update-dto';

class ListAllEntities {
  limit: number;
}

// command: "nest g controller cats" to create a controller
@Controller('cats')
export class CatsController {
  constructor(private readonly appService: AppService) {}

  @Post()
  create(@Body() createCatDto: CreateCatDto) {
    return `This action adds a new cat ${createCatDto.name} ${createCatDto.age} ${createCatDto.breed}`;
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
