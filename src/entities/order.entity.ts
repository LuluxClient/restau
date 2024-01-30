import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
import { Product } from './product.entity';
import { Table } from './table.entity';

export enum OrderStatus {
  running = 0,
  paid = 1,
  closed,
}

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  status: number;

  @Column('double')
  total_price: number;

  @Column({ type: 'datetime' })
  date_start: Date;

  @Column({ type: 'datetime', nullable: true }) 
  date_end?: Date;

  // Relation to Table entity
  @ManyToOne(() => Table, table => table.orders, { nullable: true })
  @JoinColumn({ name: 'table_id' })
  table: Table;

  products: Product[];

  constructor() {
    this.total_price = 0.0;
    this.date_start = new Date(); // Assign current date and time
    this.status = OrderStatus.running; // Assuming default status is 'running'
    this.products = [];
  }

  public addProduct(product: Product, quantity: number) {
    // find the product
    const index = this.products.findIndex((el) => {
      return el.id == product.id;
    });
    if (index >= 0) {
      // if the product is in the list, only increment the quantity
      this.products.at(index).quantity += quantity;
      // if no quantity anymore, remove the product from the list
      if (this.products.at(index).quantity <= 0) {
        this.products.splice(index, 1);
      }
    } else {
      // otherwise, add the product to the list
      this.products.push(product);
    }
    this.refresh();
  }

  public refresh() {
    // refresh the total price of each product
    // calculate the new price total
    let total = 0.0;
    this.products.forEach((el) => {
      el.refresh();
      total += el.total_price;
    });
    this.total_price = total;
  }

  public close() {
    this.status = OrderStatus.paid;
    this.date_end = new Date();
  }

  public canClose(): boolean {
    return this.products && this.products.length > 0;
  }
}
