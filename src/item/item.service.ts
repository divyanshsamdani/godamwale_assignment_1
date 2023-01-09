import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateItemDto } from './dto/create-item.dto';
import { Item } from './entities/item.entity';

@Injectable()
export class ItemService {
  constructor(@InjectRepository(Item) private itemRepository: Repository<Item>,){}

  create(name: string, quantity: number, price: number, flag: number) {
    const obj = new CreateItemDto();
    obj.productName = name;
    obj.quantity = quantity;
    if(flag==1){
      obj.stockPrice = price;
      obj.sellPrice = -1;
    }
    else{
      obj.stockPrice = -1;
      obj.sellPrice = price;
    }
    
    const item = this.itemRepository.create(obj);
    return item;
  }

  async findAll() {
    return await this.itemRepository.find({
      where:{
        deleted:false,
      },
    });
  }

  async findOne(product: string) {
    const obj = await this.itemRepository.findOne({
      where:{
        productName: product,
        deleted: false,

      }
    });
    return obj;
  }

  update(item: Item) {
    return this.itemRepository.save(item);
  }

  // remove(id: number) {

  // }
}
