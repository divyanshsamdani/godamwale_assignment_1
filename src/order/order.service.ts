import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StatusDto } from 'src/grn/dto/create-status.dto';
import { Status } from 'src/grn/entities/grn.entity';
import { ItemService } from 'src/item/item.service';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { OrderLineItem } from './entities/orderLineItem.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    @InjectRepository(OrderLineItem) private orderLineItemRepository: Repository<OrderLineItem>,
    private readonly itemService: ItemService,
  ){}
  async create(createOrderDto: CreateOrderDto) {
    const newOrder = this.orderRepository.create(createOrderDto);
    newOrder.orderLineItems = this.orderLineItemRepository.create(createOrderDto.orderLineItems)
    await this.orderLineItemRepository.save(newOrder.orderLineItems);
    return this.orderRepository.save(newOrder);
  }

  async findAll() {
    return await this.orderRepository.find({
      // relations: ['grnLineItems'],
      where:{
        deleted:false,
      },
    });
  }

   async findOne(id: number) {
    const obj =  await this.orderRepository.findOne({
      relations: ['orderLineItems'],
      where:{
        id: id,
        deleted: false
      }
    });
    return obj;
  }

  async update_status(id: number, status: StatusDto) {
    const order = await this.findOne(id);
    if(order==null){
      return "This order seems to be deleted or not present"
    }
    if(order.status=='COMPLETED'){
      return "This order is already completed"
    }
    if(status.status == "COMPLETED"){
      order.status = Status.com;
      var message = new String;
      for(var _item of order.orderLineItems){
        const ex_item = await this.itemService.findOne(_item.productName);
        if(ex_item!=null){
          if(ex_item.quantity>=_item.quantity)ex_item.quantity = ex_item.quantity - _item.quantity;
          else{
            ex_item.quantity = 0;
            console.log ("Order size exceeded inventory limit for" ,_item.productName);
          }
          ex_item.updatedAt = new Date(Date.now());
          ex_item.sellPrice = _item.sellPrice;
          
          await this.itemService.update(ex_item);
        }
        else{
            console.log( "We are currently out of stock on  order", _item.productName );
        }
      }
      await this.orderRepository.save(order);
      return message;    
    }
    else if(status.status == "CANCELLED"){
      order.status = Status.can;
      return this.orderRepository.save(order);       
    }
    else {
      throw(console.error('Bad value: Either enter COMPLETED OR CANCELLED'));
    }



  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    const oldOrder = await this.findOne(id);
    if(oldOrder==null){
      return "This order seems to be deleted or not present"
    }
    if(oldOrder.status=="COMPLETED"){
      return "This order is already completed. Update not allowed.";
    }
    oldOrder.updatedAt = new Date(Date.now());
    const newOrder = this.orderRepository.create({...oldOrder, ...updateOrderDto});
    newOrder.orderLineItems = this.orderLineItemRepository.create(updateOrderDto.orderLineItems);
    await this.orderLineItemRepository.save(newOrder.orderLineItems);
    return this.orderRepository.save(newOrder);
  }

  async remove(id: number) {
    const order = await this.findOne(id);
    if(order == null){
      return "The mentioned order is either not present, or already deleted";
    }
    order.deleted = true;
    for (var _item of order.orderLineItems){
      _item.deleted = true;
    }
    return this.orderRepository.save(order);
  }
}
