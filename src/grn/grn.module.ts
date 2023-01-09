import { Module } from '@nestjs/common';
import { GrnService } from './grn.service';
import { GrnController } from './grn.controller';
import { Grn } from './entities/grn.entity';
import { GrnLineItem } from './entities/grnLineItem.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemModule } from 'src/item/item.module';
import { ItemService } from 'src/item/item.service';
import { ItemController } from 'src/item/item.controller';
import { Item } from 'src/item/entities/item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Grn,GrnLineItem,Item]), ItemModule],
  controllers: [GrnController, ItemController],
  providers: [GrnService, ItemService]
})
export class GrnModule {}
