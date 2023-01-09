import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ItemService } from './item.service';
import { CreateItemDto } from './dto/create-item.dto';

@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Get()
  findAll() {
    return this.itemService.findAll();
  }
  
  // @Post()
  // test(@Body() createItemDto: CreateItemDto){
  //   return this.itemService.test_method(createItemDto);
  // }
  
}
