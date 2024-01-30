import { Injectable } from '@nestjs/common';
import { DataService } from '../data.service';
import { Order } from 'src/entities/order.entity';

@Injectable()
export class InvoicesService {
  constructor(private service: DataService) {}

  async getOrders(): Promise<Order[]> {
    return await this.service.findAllClosedOrders();
  }

  async getOrder(id: number): Promise<Order> {
    return this.service.findOneOrder(id);
  }
}
