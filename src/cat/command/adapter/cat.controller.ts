import { Body, Controller, Delete, Param, Post, Put } from '@nestjs/common';
import { CreateCatDto } from './create-cat.dto';
import { CatService } from '../service/cat.service';
import { UpdateCatDto } from './cat-update-dto';

@Controller('cat')
export class CatController {
  constructor(private readonly service: CatService) {}

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
