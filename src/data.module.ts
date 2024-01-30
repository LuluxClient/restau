import { Module } from '@nestjs/common';
import { DataService } from './data.service';
import { Product } from './entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Table } from './entities/table.entity';

@Module({
  imports: [
    DataModule, 
    TypeOrmModule.forFeature([Product, Order, Table])
  ],
  providers: [DataService],
  exports: [DataService],
})
export class DataModule {}
