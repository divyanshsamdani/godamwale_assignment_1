import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GrnModule } from './grn/grn.module';
import { OrderModule } from './order/order.module';
import { ItemModule } from './item/item.module';
import { dataSourceOptions } from '../db/data-source';

@Module({
  imports: [GrnModule,TypeOrmModule.forRoot(dataSourceOptions), OrderModule, ItemModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
