import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from 'src/item/entities/item.entity';
import { ItemService } from 'src/item/item.service';
import { Repository } from 'typeorm';
import { CreateGrnDto } from './dto/create-grn.dto';
import { StatusDto } from './dto/create-status.dto';
import { UpdateGrnDto } from './dto/update-grn.dto';
import { Grn, Status } from './entities/grn.entity';
import { GrnLineItem } from './entities/grnLineItem.entity';

@Injectable()
export class GrnService {
  constructor(@InjectRepository(Grn) private grnRepository: Repository<Grn>,
              @InjectRepository(GrnLineItem) private grnLineItemRepository: Repository<GrnLineItem>,
              private readonly itemService: ItemService,
            ){}
  async create(createGrnDto: CreateGrnDto): Promise<Grn> {
    const newGrn = this.grnRepository.create(createGrnDto);
    newGrn.grnLineItems =  this.grnLineItemRepository.create(createGrnDto.grnLineItems);
    await this.grnLineItemRepository.save(newGrn.grnLineItems);
    return this.grnRepository.save(newGrn);
    
  }

  async findAll() {
    return await this.grnRepository.find({
      // relations: ['grnLineItems'],
      where:{
        deleted: false,
      },
    });
  }

  async findOne(id: number) {
    const obj = await this.grnRepository.findOne({
      relations: ['grnLineItems'],
      where:{
        id: id,
        deleted: false
      }
    });
    return obj;
  }

  async update_status(id: number, status: StatusDto) {
    const grn = await this.findOne(id);
    if(grn==null){
      return "This grn seems to be deleted or not present"
    }
    if(grn.status=='COMPLETED'){
      return "This grn is already completed"
    }
    if(status.status == "COMPLETED"){
        grn.status = Status.com;
        for(var _item of grn.grnLineItems){
          const ex_item = await this.itemService.findOne(_item.productName);
          if(ex_item!=null){
    
            ex_item.quantity = ex_item.quantity + _item.quantity;
            ex_item.updatedAt = new Date(Date.now());
            
            ex_item.stockPrice = _item.stockPrice;
            await this.itemService.update(ex_item);
          }
          else{
              const new_item = this.itemService.create(_item.productName,_item.quantity,_item.stockPrice,1);
              await this.itemService.update(new_item);
          }
        }
        // return 5;
         return await this.grnRepository.save(grn);       
    }
    else if(status.status == "CANCELLED"){
      grn.status = Status.can;
      return this.grnRepository.save(grn);       
    }
    else {
      throw(console.error('Bad value: Either enter COMPLETED OR CANCELLED'));
    }
    
    
  }

  async update(id: number, updateGrnDto: UpdateGrnDto) {
    const oldGrn = await this.findOne(id);
    if(oldGrn==null){
      return "This grn seems to be deleted or not present"
    }
    if(oldGrn.status=="COMPLETED"){
      return "This grn is already completed. Update not allowed.";
    }
    oldGrn.updatedAt = new Date(Date.now());
    const newGrn = this.grnRepository.create({...oldGrn, ...updateGrnDto});
    newGrn.grnLineItems = this.grnLineItemRepository.create(updateGrnDto.grnLineItems);
    await this.grnLineItemRepository.save(newGrn.grnLineItems);
    return this.grnRepository.save(newGrn);
  }

  async remove(id: number) {
    const grn = await this.findOne(id);
    if(grn == null){
      return "The mentioned grn is either not present, or already deleted";
    }
    grn.deleted = true;
    for (var _item of grn.grnLineItems){
      _item.deleted = true;
    }
    return this.grnRepository.save(grn);
  }
}
