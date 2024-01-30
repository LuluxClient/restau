import { Injectable } from '@nestjs/common';
import { Category, Product } from './entities/product.entity';
import { Order } from './entities/order.entity';
import { Table, TypeTable } from './entities/table.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Not, IsNull } from 'typeorm';

const PATH_IMAGE = '/public/img/food/';

@Injectable()
export class DataService {
  // TO DELETE
  // private products = [];
  // private orders = [];
  // private tables = [];

  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    @InjectRepository(Table)
    private tablesRepository: Repository<Table>,
  ) {
    this.seedProducts();
    this.seedTables();
  }

  /** Public methdods */

  async findAllProducts(): Promise<Product[]> {
    // return this.products;
    return await this.productsRepository.find();
  }

  async findOneProduct(id: number): Promise<Product | null> {
    return await this.productsRepository.findOne({ where: { id } });
  }

  async findProductsByCategory(idCategory: number): Promise<Product[]> {
    return await this.productsRepository.find({
      where: {
        category: idCategory,
      },
    });
  }

  async findAllTables(): Promise<Table[]> {
    // return this.tables;
    return await this.tablesRepository.find();
  }

  async findOneTable(id: number): Promise<Table | null> {
    return await this.tablesRepository.findOne({ where: { id } });
  }

  async findOneTableByPosition(x: number, y: number): Promise<Table | null> {
    return await this.tablesRepository.findOne({ where: { posX: x, posY: y } });
  }

  async findAllOrders(): Promise<Order[]> {
    return await this.ordersRepository.find();
  }

  async findAllClosedOrders(): Promise<Order[]> {
    return await this.ordersRepository.find({
      where: {
        date_end: Not(IsNull()),
      },
    });
  }

  findOneOrder(id: number): Promise<Order | null> {
    return this.ordersRepository.findOne({ where: { id } });
  }

  async saveOrder(order: Order): Promise<Order> {
    if (!(await this.findOneOrder(order.id))) {
      return await this.ordersRepository.save(order);
    }
    return order;
  }

  async removeOrder(id: number): Promise<void> {
    await this.ordersRepository.delete(id);
  }

  async seedProducts(): Promise<void> {
    // seed products table
    console.log('** Seed products table **');
    const productsT = this.loadDefaultProducts();
    for (const product of productsT) {
      try {
        await this.productsRepository.save(product);
      } catch (error) {
        console.error('Error saving product to database:', error);
      }
    }
    console.log('** End Seed products table **');
  }

  async seedTables(): Promise<void> {
    // seed products table
    console.log('** Seed tables table **');
    const tablesT = this.loadDefaultTables();
    for (const table of tablesT) {
      try {
        await this.tablesRepository.save(table);
      } catch (error) {
        console.error('Error saving product to database:', error);
      }    
    console.log('** End Seed tables table **');
  }
}

  /** Private methods */
  private loadDefaultTables(): Table[] {
    return [];
  }

  private loadDefaultProducts(): Product[] {
    return [];
  }
}
