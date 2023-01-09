import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { GrnService } from './grn.service';
import { CreateGrnDto } from './dto/create-grn.dto';
import { UpdateGrnDto } from './dto/update-grn.dto';
import { StatusDto } from './dto/create-status.dto';
import { Grn } from './entities/grn.entity';

@Controller('grn')
export class GrnController {
  constructor(private readonly grnService: GrnService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async create(@Body() createGrnDto: CreateGrnDto): Promise<Grn> {
    return await this.grnService.create(createGrnDto);
  }

  @Post('/update-status/:id')
  update_status(@Param('id') id: string, @Body() status: StatusDto) {
    return this.grnService.update_status(+id, status);
  }

  @Get()
  findAll() {
    return this.grnService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.grnService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateGrnDto: UpdateGrnDto) {
    return this.grnService.update(+id, updateGrnDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) { 
    return this.grnService.remove(+id);
  }
}
