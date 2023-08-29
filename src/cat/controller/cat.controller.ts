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
import { CatService } from '../service/cat.service';
import { CreateCatDto } from '../dto/create-cat.dto';
import { UpdateCatDto } from '../dto/cat-update-dto';

class ListAllEntities {
  limit: number;
}

// command: "nest g controller cat" to create a controller
@Controller('cat')
export class CatController {
  constructor(private readonly service: CatService) {}

  @Get('all')
  findAll(@Query() query: ListAllEntities) {
    return `This action returns all cats (limit: ${query.limit} items)`;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `This action returns a #${id} cat`;
  }

  @Post()
  create(@Body() createCatDto: CreateCatDto): void {
    this.service.create(createCatDto);
  }

  @Put(':index')
  update(@Param('index') id: number, @Body() updateCatDto: UpdateCatDto) {
    this.service.update(id, updateCatDto);
  }

  @Delete(':index')
  remove(@Param('index') id: number) {
    this.service.remove(id);
  }
}
