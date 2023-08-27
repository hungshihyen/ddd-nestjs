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

  @Put(':id')
  update(@Param('id') id: number, @Body() updateCatDto: UpdateCatDto) {
    this.service.update(id, updateCatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id} cat`;
  }
}
