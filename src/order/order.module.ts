import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { Order } from './entities/order.entity';
import { OrderLineItem } from './entities/orderLineItem.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from 'src/item/entities/item.entity';
import { ItemModule } from 'src/item/item.module';
import { ItemController } from 'src/item/item.controller';
import { ItemService } from 'src/item/item.service';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderLineItem,Item]), ItemModule],
  controllers: [OrderController, ItemController],
  providers: [OrderService, ItemService]
})
export class OrderModule {}
