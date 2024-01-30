import { Injectable } from '@nestjs/common';
import { DataService } from '../data.service';
import { Table } from 'src/entities/table.entity';
import { Product } from 'src/entities/product.entity';

@Injectable()
export class TablePanelService {
  private _table: Table;
  private _id: number;
  constructor(private service: DataService) {}

  get table(): Table {
    if (this._table && this._id == this._table.id) return this._table;
    const table = this.service.findOneTable(this._id);
    if (table) {
      this.service.findOneTable(this._id).then((t) => {
        this._table = t;
      });
    }
    
    return this._table;
  }

  async getTable(id: number): Promise<Table> {
    this._id = id;
    this._table = await this.service.findOneTable(this._id);
    // load order
    if (this._table && this._table.order && this._table.order.id) {
      const order = await this.service.findOneOrder(this._table.order.id);
      this._table.order = order;
    }
    return this.table;
  }

  async getProducts(id_category: number): Promise<Product[]> {
    return await this.service.findProductsByCategory(id_category);
  }

  async addProductOrder(id_product: number, quantity: number) {
    const product = await this.service.findOneProduct(id_product);
    this.table.addProductOrder(product, quantity);
    await this.service.saveOrder(this.table.order);
  }

  async closeOrder() {
    if (!this.table.order?.canClose()) return;
    this.table.order.close();
    await this.service.saveOrder(this.table.order);
    this.table.close();
  }

  async clearOrder() {
    await this.service.removeOrder(this.table?.order?.id);
    this.table?.close();
  }
}
